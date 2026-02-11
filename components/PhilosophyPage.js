
import { renderNavbar } from './Navbar.js';
import { renderFooter } from './Sections.js';

export function renderPhilosophyDeepDive() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    // Add custom styles for this page's animations and layout
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s ease-out;
        }
        .reveal-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(205, 173, 125, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 40px rgba(205, 173, 125, 0.1);
            border-color: rgba(205, 173, 125, 0.5);
        }
        .pillar-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: inline-block;
            background: linear-gradient(45deg, #CDAD7D, #F4F1EC);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;
    document.head.appendChild(style);

    main.innerHTML = `
        <!-- Hero Section: Impactful 3D Centerpiece -->
        <section style="position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; background: #0a0a0c;">
             <!-- Ambient Background Glow -->
            <div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, rgba(70, 20, 100, 0.15), #0a0a0c 70%); z-index: 0;"></div>
            
            <div class="container" style="position: relative; z-index: 2; text-align: center;">
                <div class="reveal-on-scroll">
                    <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); color: #fff; margin-bottom: 2rem; letter-spacing: 2px;">
                        <span style="color: #CDAD7D; font-size: 0.6em; display: block; margin-bottom: 0.5rem; letter-spacing: 6px;">EL MANIFIESTO</span>
                        LIBRE & LOCO
                    </h1>
                    
                    <!-- 3D Logo Centerpiece -->
                    <div style="position: relative; width: 300px; height: 300px; margin: 0 auto 3rem auto; perspective: 1000px;">
                        <img src="./assets/logo_4l_3d_neon.jpg" alt="4L 3D Emblem" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 50px rgba(138, 43, 226, 0.4)); animation: float 6s ease-in-out infinite; border-radius: 20px;">
                        <!-- Glow effect behind -->
                         <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 80%; background: #8A2BE2; filter: blur(80px); opacity: 0.3; z-index: -1;"></div>
                    </div>

                    <p style="font-size: 1.4rem; color: #e0e0e0; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                        "La locura no tiene límites. Y nosotros tampoco."
                    </p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 40px; animation: bounce 2s infinite; opacity: 0.7;">
                <span style="font-size: 2rem; color: #CDAD7D;">↓</span>
            </div>
        </section>

        <!-- The 4 Pillars Grid (Glassmorphism with Neon Accents) -->
        <section style="background-color: #0F1015; padding: 8rem 0; position: relative;">
            <!-- Background Texture -->
             <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.3; background-image: url('./assets/gold_navy_texture.png'); background-size: cover; pointer-events: none;"></div>

            <div class="container" style="position: relative; z-index: 2;">
                <div style="text-align: center; margin-bottom: 6rem;">
                    <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #CDAD7D;">4 Pilares de Identidad</h2>
                    <div style="width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #CDAD7D, transparent); margin: 1.5rem auto;"></div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                    
                    <!-- Libertad -->
                    <div class="glass-card reveal-on-scroll" style="padding: 3rem; border-radius: 10px; border-top: 3px solid #CDAD7D;">
                        <div class="pillar-icon">🦅</div>
                        <h3 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">LIBERTAD</h3>
                        <p style="color: #a0a0a0; font-size: 1.05rem; line-height: 1.7;">
                            El ala que alza el vuelo. La audacia de romper con lo convencional y diseñar tu propio camino sin inercias.
                        </p>
                    </div>

                    <!-- Liderazgo -->
                    <div class="glass-card reveal-on-scroll" style="padding: 3rem; border-radius: 10px; border-top: 3px solid #4a90e2; transition-delay: 0.1s;">
                        <div class="pillar-icon">⚡</div>
                        <h3 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">LIDERAZGO</h3>
                        <p style="color: #a0a0a0; font-size: 1.05rem; line-height: 1.7;">
                            El faro de la intención. Un eje vertical de disciplina y coherencia que conecta tu realidad con tus sueños.
                        </p>
                    </div>

                    <!-- Legado -->
                    <div class="glass-card reveal-on-scroll" style="padding: 3rem; border-radius: 10px; border-top: 3px solid #50c878; transition-delay: 0.2s;">
                        <div class="pillar-icon">🌳</div>
                        <h3 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">LEGADO</h3>
                        <p style="color: #a0a0a0; font-size: 1.05rem; line-height: 1.7;">
                           La fuerza de las raíces. No es lo que acumulas, es lo que dejas. La verdad de tus orígenes y tu memoria.
                        </p>
                    </div>

                    <!-- Locura -->
                    <div class="glass-card reveal-on-scroll" style="padding: 3rem; border-radius: 10px; border-top: 3px solid #9b59b6; transition-delay: 0.3s;">
                        <div class="pillar-icon">✨</div>
                        <h3 style="color: #fff; font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">LOCURA</h3>
                        <p style="color: #a0a0a0; font-size: 1.05rem; line-height: 1.7;">
                            La chispa del genio. Esa valentía incómoda que transforma la lógica pura en osadía y dinamismo.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- Anatomy Section (Blueprint Style) -->
        <section style="background-color: #fff; padding: 8rem 0; overflow: hidden;">
            <div class="container">
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4rem;">
                    
                    <!-- Text Side -->
                    <div class="reveal-on-scroll" style="flex: 1; min-width: 350px;">
                        <span style="font-family: monospace; color: #888; letter-spacing: 2px; text-transform: uppercase;">FIG 1.0 — Diseño Estructural</span>
                        <h2 style="font-family: 'Playfair Display', serif; font-size: 3.5rem; color: #1a1a1a; margin: 1rem 0 2rem 0; line-height: 1.1;">
                            Anatomía de<br>una Identidad
                        </h2>
                        <p style="font-size: 1.2rem; line-height: 1.7; color: #555; margin-bottom: 2rem;">
                            El sello de las 4L no es solo un logotipo. Es un <strong>santuario hexagonal</strong> donde convergen las fuerzas que nos impulsan.
                        </p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
                                <span style="width: 10px; height: 10px; background: #1a1a1a; border-radius: 50%;"></span>
                                <span style="font-size: 1.1rem; color: #333;">Geometría Sagrada</span>
                            </li>
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
                                <span style="width: 10px; height: 10px; background: #CDAD7D; border-radius: 50%;"></span>
                                <span style="font-size: 1.1rem; color: #333;">Fusión Orgánica y Mecánica</span>
                            </li>
                            <li style="display: flex; align-items: center; gap: 1rem;">
                                <span style="width: 10px; height: 10px; background: #8A2BE2; border-radius: 50%;"></span>
                                <span style="font-size: 1.1rem; color: #333;">Equilibrio Perfecto</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Sketch Image Side -->
                    <div class="reveal-on-scroll" style="flex: 1.2; min-width: 350px; text-align: center; position: relative;">
                        <!-- Tech pattern overlay -->
                        <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; border: 1px dashed #ccc; border-radius: 50%;"></div>
                        
                        <img src="./assets/logo_4l_sketch.jpg" alt="4L Blueprint Sketch" style="width: 100%; max-width: 500px; height: auto; filter: contrast(1.1) grayscale(100%); mix-blend-mode: multiply;">
                    </div>
                </div>
            </div>
        </section>

        <!-- Split Section: Compass & direction -->
        <section style="background-color: #0c0c0c; padding: 0; color: white;">
             <div style="display: flex; flex-wrap: wrap-reverse;">
                 <!-- High-Res Image -->
                <div style="flex: 1; min-width: 400px; height: 600px;">
                    <img src="./assets/compass_leadership.png" alt="Compass" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
                </div>
                
                <!-- Content -->
                <div class="reveal-on-scroll" style="flex: 1; min-width: 400px; padding: 6rem; display: flex; flex-direction: column; justify-content: center; background: radial-gradient(circle at top right, #1a1a2e, #0c0c0c);">
                    <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #fff; margin-bottom: 2rem;">¿Hacia dónde vas?</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #ccc; margin-bottom: 2rem;">
                        Tener un mapa no sirve de nada si no tienes la intención de moverte. Nuestra brújula no marca el norte, marca tu <strong>propósito</strong>.
                    </p>
                    <a href="./assets/manifiesto_infographic.png" download="Manifiesto_Libre_y_Loco.png" class="btn btn-outline" style="align-self: flex-start; border-color: #CDAD7D; color: #CDAD7D; font-weight: bold; letter-spacing: 1px;">
                        📥 DESCARGAR EL MANIFIESTO
                    </a>
                </div>
             </div>
        </section>
    `;


    // Initialize Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}
