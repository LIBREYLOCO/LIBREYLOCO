export function renderHero() {
    const hero = document.getElementById('hero-section');
    hero.innerHTML = `
        <div class="container hero-container">
            <div class="hero-content">
                <h1 class="fade-in" style="display: flex; flex-direction: column; gap: 3rem; width: 100%;">
                    <span style="align-self: flex-start; text-align: left; max-width: 90%;">VIVIR AL CIEN NO ES UNA META.</span>
                    <span style="align-self: flex-end; text-align: right; color: var(--primary-gold); max-width: 90%;">ES LA ÚNICA FORMA DE VIVIR.</span>
                </h1>
                <p class="fade-in-delay gold-text">LIBRE & LOCO</p>
                <div class="hero-actions fade-in-delay">
                    <a href="#game-section" class="btn btn-primary">Camino al Éxito</a>
                    <a href="https://caminoalexitoplus.netlify.app/" target="_blank" class="btn btn-outline">Juega Hoy</a>
                </div>
            </div>
            <div class="hero-visual fade-in">
                <img src="./assets/libre_y_loco_art.jpg" alt="Libre y Loco Art" style="width: 100%; max-width: 500px; border-radius: 50%; box-shadow: 0 0 40px rgba(212, 175, 55, 0.3);">
            </div>
        </div>
    `;
}
