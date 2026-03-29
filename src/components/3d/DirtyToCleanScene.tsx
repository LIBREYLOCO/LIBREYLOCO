"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   GLSL — Simplex 3D Noise
   ═══════════════════════════════════════════ */

const noiseGLSL = /* glsl */ `
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      if (i >= octaves) break;
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
`;

/* ═══════════════════════════════════════════
   Dirty → Clean Shader Material
   ═══════════════════════════════════════════ */

const DirtyCleanMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 1.0,
    uNoiseScale: 2.5,
    uDisplacementStrength: 0.6,
    uCleanColor: new THREE.Color("#8b5cf6"),
    uDirtyColor: new THREE.Color("#1a0a2e"),
    uAccentColor: new THREE.Color("#06ffa5"),
  },
  /* glsl */ `
    ${noiseGLSL}

    uniform float uTime;
    uniform float uProgress;
    uniform float uNoiseScale;
    uniform float uDisplacementStrength;

    varying vec2 vUv;
    varying float vDisplacement;
    varying float vNoise;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float noise1 = fbm(pos * uNoiseScale + uTime * 0.25, 4);
      float noise2 = abs(snoise(pos * uNoiseScale * 1.8 + uTime * 0.4));
      float combinedNoise = noise1 * 0.65 + noise2 * 0.35;

      float displacement = combinedNoise * uDisplacementStrength * uProgress;
      vDisplacement = displacement;
      vNoise = combinedNoise;

      pos += normal * displacement;

      float jitter = uProgress * 0.03;
      pos.x += sin(uTime * 3.5 + pos.y * 6.0) * jitter;
      pos.y += cos(uTime * 2.8 + pos.x * 5.0) * jitter;
      pos.z += sin(uTime * 1.9 + pos.z * 4.0) * jitter * 0.5;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* glsl */ `
    ${noiseGLSL}

    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uCleanColor;
    uniform vec3 uDirtyColor;
    uniform vec3 uAccentColor;

    varying vec2 vUv;
    varying float vDisplacement;
    varying float vNoise;

    void main() {
      float yGrad = smoothstep(0.0, 1.0, vUv.y);
      vec3 cleanColor = mix(uCleanColor * 0.8, uCleanColor * 1.3, yGrad);
      cleanColor = mix(cleanColor, uAccentColor * 0.4, smoothstep(0.4, 0.6, vUv.y) * 0.3);

      float grain = fract(sin(dot(vUv * (uTime * 0.5 + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
      float dynamicNoise = snoise(vec3(vUv * 6.0, uTime * 0.3));
      vec3 dirtyColor = uDirtyColor * (0.6 + grain * 0.5 + dynamicNoise * 0.3);
      dirtyColor += vec3(0.15, 0.02, 0.3) * abs(vDisplacement) * 3.0;

      vec3 color = mix(cleanColor, dirtyColor, uProgress);

      float transitionEdge = sin(uProgress * 3.14159) * 0.8;
      float edgeGlow = smoothstep(0.1, 0.5, abs(vNoise)) * transitionEdge;
      color += uAccentColor * edgeGlow * 0.5;

      float scanline = sin(vUv.y * 200.0 + uTime * 2.0) * 0.5 + 0.5;
      color = mix(color, color * (0.85 + scanline * 0.15), uProgress * 0.6);

      float chromaticShift = snoise(vec3(vUv * 10.0, uTime * 0.8)) * uProgress * 0.08;
      color.r += chromaticShift;
      color.b -= chromaticShift * 0.5;

      float alpha = mix(1.0, 0.88 + grain * 0.12, uProgress * 0.4);

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ DirtyCleanMaterial });

/* ═══════════════════════════════════════════
   Particle Shader Material
   ═══════════════════════════════════════════ */

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 1.0,
    uColor1: new THREE.Color("#c4b5fd"),
    uColor2: new THREE.Color("#06ffa5"),
  },
  /* glsl */ `
    ${noiseGLSL}

    attribute float aRandom;
    attribute float aSize;

    uniform float uTime;
    uniform float uProgress;

    varying float vRandom;
    varying float vAlpha;

    void main() {
      vRandom = aRandom;
      vec3 pos = position;

      vec3 offset = vec3(
        snoise(pos * 2.0 + uTime * 0.5 + aRandom * 10.0),
        snoise(pos * 2.0 + uTime * 0.4 + aRandom * 20.0 + 100.0),
        snoise(pos * 2.0 + uTime * 0.6 + aRandom * 30.0 + 200.0)
      );
      pos += offset * uProgress * 1.5;

      float baseSize = aSize * (1.0 + uProgress * 2.0);
      float pulse = sin(uTime * 3.0 + aRandom * 6.28) * 0.5 + 0.5;
      float size = baseSize * (1.0 + pulse * uProgress * 0.8);

      float flicker = mix(1.0, 0.3 + pulse * 0.7, uProgress * 0.7);
      vAlpha = flicker * mix(0.9, 0.4 + aRandom * 0.6, uProgress);

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    uniform float uProgress;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    varying float vRandom;
    varying float vAlpha;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;

      float softEdge = 1.0 - smoothstep(0.3, 0.5, dist);

      vec3 color = mix(uColor1, uColor2, vRandom * 0.6 + (1.0 - uProgress) * 0.4);
      color += vec3(0.2, 0.05, 0.4) * uProgress * (1.0 - dist * 2.0);

      gl_FragColor = vec4(color, softEdge * vAlpha);
    }
  `
);

extend({ ParticleMaterial });

/* ═══════════════════════════════════════════
   Mesh Component — Dirty → Clean Surface
   ═══════════════════════════════════════════ */

interface ProgressProps {
  progressRef: React.MutableRefObject<{ value: number }>;
}

function DirtyCleanMesh({ progressRef }: ProgressProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = progressRef.current.value;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1;
      meshRef.current.rotation.y = clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 64]} />
      <dirtyCleanMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   Particle Cloud Component
   ═══════════════════════════════════════════ */

function ParticleCloud({ progressRef }: ProgressProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 1000 : 3000;
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 1.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      rnd[i] = Math.random();
      sz[i] = 1.0 + Math.random() * 3.0;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(rnd, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = progressRef.current.value;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <particleMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   Post-Processing Effects
   ═══════════════════════════════════════════ */

function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        intensity={1.2}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.002, 0.001)}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.06}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
      <Vignette offset={0.3} darkness={0.65} />
    </EffectComposer>
  );
}

/* ═══════════════════════════════════════════
   Scene Content
   ═══════════════════════════════════════════ */

function SceneContent({ progressRef }: ProgressProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#c4b5fd" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#06ffa5" />

      <DirtyCleanMesh progressRef={progressRef} />
      <ParticleCloud progressRef={progressRef} />
      <PostFX />
    </>
  );
}

/* ═══════════════════════════════════════════
   Main Export — DirtyToCleanScene
   ═══════════════════════════════════════════ */

interface DirtyToCleanSceneProps {
  className?: string;
  progressRef: React.MutableRefObject<{ value: number }>;
}

export default function DirtyToCleanScene({
  className = "",
  progressRef,
}: DirtyToCleanSceneProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,255,165,0.1) 100%)",
        }}
      >
        <div className="text-center px-6">
          <p
            className="text-2xl md:text-4xl font-medium"
            style={{ fontFamily: "var(--font-clash)", color: "var(--fg)" }}
          >
            Del caos a la <span className="text-gradient">claridad</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <SceneContent progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
