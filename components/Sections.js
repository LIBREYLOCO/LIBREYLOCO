export function renderBio() {
    const bio = document.getElementById('bio-section');
    bio.innerHTML = `
        <div class="container bio-container" style="display: flex; flex-direction: column; text-align: center; padding-top: 4rem;">
            <!-- Coin Logo Centered and Larger -->
            <div class="bio-coin-container" style="margin-bottom: 2rem; position: relative; display: inline-block;">
                 <img src="./assets/coin_clean.png" alt="Filosofía 4L" style="width: 280px; height: auto; filter: drop-shadow(0 0 25px rgba(205, 173, 125, 0.4)); animation: float 6s ease-in-out infinite;">
            </div>
            
            <h2 class="section-title" style="margin-bottom: 3rem; color: var(--accent-purple); font-size: 3rem; align-self: center;">¿QUIÉN SOY?</h2>
            
            <div class="bio-content-wrapper" style="display: flex; flex-direction: column; align-items: center; gap: 2rem; max-width: 900px; margin: 0 auto;">
                
                <!-- Portrait Centered -->
                <div class="bio-portrait" style="position: relative; width: 300px; height: auto; margin-bottom: 1rem;">
                    <div style="position: absolute; top: 15px; left: 15px; width: 100%; height: 100%; border: 2px solid var(--primary-gold); z-index: 0; border-radius: 4px;"></div>
                    <img src="./assets/juan_carlos_photo.jpg" alt="Juan Carlos Gutiérrez Aladro" style="width: 100%; border-radius: 4px; position: relative; z-index: 1; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                </div>
                
                <!-- Name and Text Centered -->
                <div class="bio-text" style="text-align: center;">
                    <h3 style="color: var(--primary-gold); font-size: 2.2rem; margin-bottom: 1.5rem; font-family: 'Playfair Display', serif; letter-spacing: 1px;">Juan Carlos Gutiérrez Aladro</h3>
                    
                    <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 1.5rem; color: #4a4a4a; font-weight: 500;">
                        Escritor, conferencista y emprendedor. Mi filosofía se centra en los cuatro pilares: <strong style="color: var(--accent-purple);">Libertad, Legado, Liderazgo y Locura</strong>. He sido emprendedor desde joven, fundando proyectos y dirigiendo equipos, con fracasos y aprendizajes que me impulsaron a crecer.
                    </p>
                    <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 1.5rem; color: #4a4a4a; font-weight: 500;">
                        Fundé colegios, creé funerarias de lujo como <strong style="color: var(--primary-gold);">Airapí y Amaité</strong>, y escribí para transformar vidas con historias y principios reales. Me defino como alguien que no busca acumular, sino dejar huella con sentido.
                    </p>
                    <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 3rem; color: #4a4a4a; font-weight: 500;">
                         Vivo entre Madrid y Querétaro, amo caminar, leer y conversar con quienes me abren su historia. Así quiero seguir: <strong style="color: var(--primary-gold);">libre y loco</strong>, con los pies en la tierra y el corazón en las personas.
                    </p>
                    
                    <div class="hero-actions">
                        <a href="#projects-section" class="btn btn-primary">CONOCE MIS PROYECTOS</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderFourLs() {
    const section = document.getElementById('four-ls-section');
    // Apply dark background to the section container (assuming section has id 'four-ls-section')
    section.style.backgroundColor = "#111827"; // Deep Navy/Black
    section.style.color = "#f3f4f6";
    section.style.padding = "5rem 0";

    section.innerHTML = `
        <div class="container">
            <div class="philosophy-layout" style="display: flex; align-items: center; gap: 6rem; flex-wrap: wrap; justify-content: center;">
                <!-- Logo with Gold Filter -->
                <div class="philosophy-logo" style="flex: 1; min-width: 300px; display: flex; justify-content: center;">
                    <img src="./assets/logo_purple_linear.png" alt="4L Logo" style="width: 100%; max-width: 450px; filter: brightness(0) saturate(100%) invert(83%) sepia(16%) saturate(1376%) hue-rotate(356deg) brightness(89%) contrast(86%); opacity: 0.9;"> 
                    <!-- The filter above approximates the gold color #CDAD7D -->
                </div>
                
                <div class="philosophy-content" style="flex: 1.5; min-width: 300px;">
                    <h2 class="section-title" style="text-align: left; color: #CDAD7D; font-size: 3rem; margin-bottom: 2rem; border-bottom: 2px solid #CDAD7D; display: inline-block; padding-bottom: 0.5rem;">MI MUNDO</h2>
                    
                    <div class="ls-list" style="display: flex; flex-direction: column; gap: 2rem;">
                        <div class="l-item">
                            <h3 style="color: #CDAD7D; margin-bottom: 0.5rem; font-size: 1.4rem;">• LIBERTAD:</h3>
                            <p style="color: #e5e7eb; font-size: 1.1rem; line-height: 1.6;">No es hacer lo que quieras. Es decidir quién quieres ser y diseñar tu vida con intención.</p>
                        </div>
                        <div class="l-item">
                            <h3 style="color: #CDAD7D; margin-bottom: 0.5rem; font-size: 1.4rem;">• LIDERAZGO:</h3>
                            <p style="color: #e5e7eb; font-size: 1.1rem; line-height: 1.6;">No comienza con personas, cargos o aplausos. Comienza contigo: con disciplina, coherencia y la valentía de exigirte más.</p>
                        </div>
                        <div class="l-item">
                            <h3 style="color: #CDAD7D; margin-bottom: 0.5rem; font-size: 1.4rem;">• LOCURA:</h3>
                            <p style="color: #e5e7eb; font-size: 1.1rem; line-height: 1.6;">Es atreverte cuando otros dudan, avanzar cuando otros esperan y creer cuando aún no hay pruebas.</p>
                        </div>
                        <div class="l-item">
                            <h3 style="color: #CDAD7D; margin-bottom: 0.5rem; font-size: 1.4rem;">• LEGADO:</h3>
                            <p style="color: #e5e7eb; font-size: 1.1rem; line-height: 1.6;">No es lo que acumulas, es lo que dejas. Es construir algo que siga hablando de ti cuando ya no estés.</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 4rem;">
                        <a href="philosophy.html" target="_blank" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.1rem;">MÁS INFO</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderProjects() {
    const section = document.getElementById('projects-section');
    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">MIS LIBROS</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <img src="./assets/vive_al_cien_cover.jpg" alt="Book: Vive al Cien" style="width: 100%; height: auto;">
                    <div class="project-info">
                        <h3>VIVE AL CIEN</h3>
                        <p>Impulsa a tomar las riendas de tu vida y vivir con intención, valentía y propósito.</p>
                        <a href="https://www.amazon.com.mx/VIVE-AL-CIEN-Libertad-Liderazgo-ebook/dp/B0DQF13MQ3?ref_=ast_author_mpb" target="_blank" class="btn-text">ORDENA YA &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/aun_cover.png" alt="Book: Aún" style="width: 100%; height: auto;">
                    <div class="project-info">
                        <h3>AÚN</h3>
                        <p>Transforma la forma en que entiendes el fracaso. Lo que parece un punto final puede ser solo una pausa.</p>
                        <a href="https://www.amazon.com.mx/A%C3%9AN-Tres-letras-transforman-vida/dp/B0FNQNZB16/ref=sr_1_1?dib=eyJ2IjoiMSJ9.ucCUHIR3nsyYz_ZxHFEHym7rfGP_mUyr_zOLJgWe-Os.NA1cNAtrJYmHw0sysbE52z8OlBpjv2HqbInP_eQvnX4&dib_tag=se&keywords=a%C3%BAn+juan+carlos+gutierrez+aladro&qid=1769972095&sr=8-1" target="_blank" class="btn-text">ORDENA YA &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/ideas_locas_cover.jpg" alt="Book: El Quiosco de las Ideas Locas" style="width: 100%; height: auto;">
                    <div class="project-info">
                        <h3>EL QUIOSCO DE LAS IDEAS LOCAS</h3>
                        <p>Libro divertido para grandes pequeños emprendedores donde la imaginación manda.</p>
                        <a href="https://www.amazon.com.mx/El-Quiosco-las-Ideas-Locas-ebook/dp/B0FN87CPJ2?ref_=ast_author_dp&th=1&psc=1" target="_blank" class="btn-text">ORDENA YA &rarr;</a>
                    </div>
                </div>
            </div>

            <h2 id="game-section" class="section-title" style="margin-top: 5rem; text-align: center; color: var(--primary-gold);">CAMINO AL ÉXITO</h2>
            
            <div class="game-showcase" style="background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); margin-bottom: 4rem;">
                <!-- Main Header with 3D Logo -->
                <div style="background: url('./assets/game_board_angle.png') no-repeat center center; background-size: cover; padding: 3rem 2rem; position: relative;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7);"></div>
                    <div style="position: relative; z-index: 2; text-align: center;">
                        <img src="./assets/game_logo_3d.png" alt="Camino al Éxito Logo 3D" style="max-width: 350px; width: 100%; filter: drop-shadow(0 0 20px rgba(255,215,0,0.3)); transform: scale(1.1);">
                    </div>
                </div>

                <div style="padding: 3rem; color: #f4f4f4;">
                    <div style="display: flex; flex-wrap: wrap; gap: 3rem; align-items: center;">
                        
                        <!-- Left Column: Description & Actions -->
                        <div style="flex: 1; min-width: 300px;">
                            <p style="font-size: 1.2rem; margin-bottom: 1.5rem; line-height: 1.7; color: #e0e0e0;">Camino al Éxito no es solo un juego de mesa, es una experiencia que te sacude, te reta y te hace reír mientras tomas decisiones que se sienten tan reales como la vida misma.</p>
                            <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: #ccc;">Aquí puedes volverte millonario, quedarte sin un peso, perder la salud, recuperar la felicidad o tomar decisiones tan locas que todos en la mesa se quedan en silencio… y luego estallan de risa. Cada turno es una sorpresa, cada elección importa y nadie sabe quién va a ganar hasta el último momento.</p>
                            <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #ccc;">Es intenso, ágil, caótico, emocionante y adictivo. No solo juegas: te picas, aprendes, te reflejas y terminas la partida con una sonrisa. <strong>Porque en Camino al Éxito, como en la vida, todo puede cambiar en una sola tirada.</strong></p>
                            
                            <div class="hero-actions" style="margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 1rem;">
                                <a href="coming-soon.html" target="_blank" class="btn btn-primary" style="flex: 1; text-align: center; white-space: nowrap;">VERSION FÍSICA</a>
                                <a href="https://caminoalexitoplus.netlify.app/" target="_blank" class="btn btn-red" style="flex: 1; text-align: center; white-space: nowrap;">JUEGALO AQUI GRATIS SOLO HOY</a>
                            </div>
                        </div>

                        <!-- Right Column: Visuals Grid -->
                        <div style="flex: 1; min-width: 300px; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <img src="./assets/game_friends_playing.jpg" alt="Friends Playing" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); grid-column: 1 / -1;">
                            <img src="./assets/game_infographic.jpg" alt="Game Infographic" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
                             <div style="background: url('./assets/game_board_angle.png') no-repeat center; background-size: cover; border-radius: 10px; height: 150px; border: 1px solid rgba(255,255,255,0.1);"></div>
                        </div>

                    </div>
                </div>
            </div>

            <h2 id="companies-section" class="section-title" style="margin-top: 4rem;">PROYECTOS</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <img src="./assets/projects/nwl_logo.png" alt="Colegio NWL" style="width: 100%; height: 200px; object-fit: contain; padding: 20px; background: white; border-bottom: 1px solid #eee;">
                    <div class="project-info">
                        <h3>COLEGIO NWL</h3>
                        <p>NWL es un colegio que forma personas, no solo alumnos. Su modelo educativo integra desarrollo académico, emocional y personal para que cada estudiante descubra quién es, qué lo mueve y cómo crear su propio proyecto de vida con liderazgo, criterio y confianza.</p>
                        <p class="gold-text" style="font-weight: bold; margin-bottom: 1rem;">5 CAMPUS<br>KINDER, PRIMARIA, SECUNDARIA Y PREPARATORIA</p>
                        <a href="https://nwl.com.mx/" target="_blank" class="btn-text">VISITAR SITIO &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/projects/airapi_logo.png" alt="Airapi Memorial Park" style="width: 100%; height: 200px; object-fit: contain; padding: 20px; background: white; border-bottom: 1px solid #eee;">
                    <div class="project-info">
                        <h3>AIRAPI MEMORIAL PARK</h3>
                        <p>Airapí es un tributo a la vida: un espacio diseñado para despedir con paz, belleza y dignidad, donde el servicio humano, la arquitectura y el acompañamiento convierten el adiós en un acto de amor y memoria.</p>
                        <p class="gold-text" style="font-weight: bold; margin-bottom: 1rem;">3 Parques memoriales<br>Querétaro, Mérida y Monterrey</p>
                        <a href="http://www.airapi.mx/" target="_blank" class="btn-text">VISITAR SITIO &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/projects/forever_friends_logo.jpg" alt="Forever Friends" style="width: 100%; height: 200px; object-fit: contain; padding: 20px; background: white; border-bottom: 1px solid #eee;">
                    <div class="project-info">
                        <h3>FOREVER FRIENDS</h3>
                        <p>Forever Friends es un espacio creado para honrar el amor incondicional que nos regalan nuestras mascotas. Un servicio cálido y respetuoso que transforma la despedida en un acto de gratitud, memoria y paz, acompañando a las familias en uno de los momentos más sensibles con humanidad, cuidado y corazón.</p>
                         <p class="gold-text" style="font-weight: bold; margin-bottom: 1rem;">3 sedes<br>Querétaro, Veracruz y Monterrey</p>
                         <a href="https://www.amaite.mx/" target="_blank" class="btn-text">VISITAR SITIO &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/projects/ocho_acostado.png" alt="Ocho Acostado" style="width: 100%; height: 200px; object-fit: contain; padding: 20px; background: #0a0a0a; border-bottom: 1px solid #333;">
                    <div class="project-info">
                        <h3>OCHO ACOSTADO</h3>
                        <p style="font-size: 0.8rem; letter-spacing: 1px; color: var(--primary-gold); margin-bottom: 0.5rem; font-weight: bold;">INFINITE & GROWTH INTELLIGENCE</p>
                        <p>Ocho Acostado hace posible tener una segunda vivienda nacional en propiedad fraccionada, dividiendo el uso en octavos para que disfrutes casas extraordinarias sin cargar con el costo total, el mantenimiento ni la gestión. Es una forma inteligente, flexible y accesible de vivir más, viajar mejor y convertir el descanso en una experiencia real, simple y sin complicaciones.</p>
                        <a href="#" class="btn-text">VISITAR SITIO &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="./assets/projects/altura.png" alt="Altura" style="width: 100%; height: 200px; object-fit: contain; padding: 20px; background: #fdfdfd; border-bottom: 1px solid #eee;">
                    <div class="project-info">
                        <h3>ALTURA</h3>
                        <p style="font-size: 0.8rem; letter-spacing: 1px; color: var(--primary-gold); margin-bottom: 0.5rem; font-weight: bold;">GROWTH & BRAND INTELLIGENCE</p>
                        <p>Altura es la agencia de publicidad inhouse creada para pensar en grande y ejecutar con precisión. Estrategia, creatividad y contenido alineados al negocio, diseñados desde dentro para construir marcas sólidas, coherentes y con impacto real.</p>
                        <a href="#" class="btn-text">VISITAR SITIO &rarr;</a>
                    </div>
                </div>
                <div class="project-card" style="background: linear-gradient(135deg, #fdfbf7 0%, #f4f1ec 100%); border: 2px dashed var(--primary-gold); display: flex; flex-direction: column; justify-content: center;">
                    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; flex: 1;">
                        <img src="./assets/logo_purple_card.png" alt="Próximamente" style="width: 80%; max-width: 150px; opacity: 0.8; filter: drop-shadow(0 5px 15px rgba(74, 20, 140, 0.2)); transition: transform 0.5s ease;">
                    </div>
                    <div class="project-info" style="text-align: center;">
                        <h3 style="color: var(--accent-purple);">PRÓXIMAMENTE...</h3>
                        <p style="font-style: italic;">"La locura no tiene límites, y nosotros tampoco."</p>
                        <p>Estamos cocinando nuevas formas de transformar el mundo. Mantente atento.</p>
                        <span style="font-size: 1.5rem; display: block; margin-top: 1rem;">🚀✨🔥</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderFooter() {
    const footer = document.getElementById('main-footer');
    footer.innerHTML = `
        <div class="container footer-container">
            <div class="footer-info">
                <div class="logo">
                    <span class="gold-text">LIBRE</span> & <span class="gold-text">LOCO</span>
                </div>
                <p>Una filosofía de vida. Un compromiso con la verdad.</p>
            </div>
            <div class="footer-links">
                <div class="link-group">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="#hero-section">Inicio</a></li>
                        <li><a href="#bio-section">Bio</a></li>
                        <li><a href="#four-ls-section">4 L's</a></li>
                        <li><a href="#projects-section">Proyectos</a></li>
                    </ul>
                </div>
                <div class="link-group">
                    <h4>Contacto</h4>
                    <ul>
                        <li><span class="gold-text">QUERÉTARO - MADRID</span></li>
                        <li><a href="mailto:hola@libreyloco.com">hola@libreyloco.com</a></li>
                        <li><a href="https://www.instagram.com/libreyloco/" target="_blank">Instagram</a></li>
                        <li><a href="https://www.youtube.com/@libreyloco" target="_blank">YouTube</a></li>
                        <li><a href="https://mx.linkedin.com/in/juan-carlos-guti%C3%A9rrez-aladro-3a5a7b1b" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} Libre & Loco. Todos los derechos reservados.</p>
            </div>
        </div>
    `;
}
