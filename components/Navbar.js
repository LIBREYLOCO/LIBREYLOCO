export function renderNavbar() {
    const header = document.getElementById('main-header');
    header.innerHTML = `
        <nav class="navbar">
            <div class="container nav-container">
                <div class="logo" style="display: flex; align-items: center; gap: 12px;">
                    <img src="./assets/coin_nav.png" alt="Logo" style="height: 45px; width: auto;">
                    <span><span class="gold-text">LIBRE</span> & <span class="gold-text">LOCO</span></span>
                </div>
                <ul class="nav-links">
                    <li><a href="#projects-section">Tienda</a></li>
                    <li><a href="#four-ls-section">Mi Filosofía</a></li>
                    <li><a href="#projects-section">Libros</a></li>
                    <li><a href="#game-section">Juegos</a></li>
                    <li><a href="#companies-section">Proyectos</a></li>
                    <li><a href="#main-footer">Contacto</a></li>
                </ul>
                <div class="nav-cta">
                    <a href="index.html" class="btn btn-primary">Comenzar</a>
                </div>
                <button class="mobile-menu-btn" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `;

    // Add Navbar Styles dynamically or via index.css
    // Let's add them to index.css for cleaner approach, but I'll add the logic for mobile menu here
    const mobileBtn = header.querySelector('.mobile-menu-btn');
    const navLinks = header.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });
}
