import type { Object3DNode } from "@react-three/fiber";
import type { ShaderMaterial } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    dirtyCleanMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    particleMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
  }
}
