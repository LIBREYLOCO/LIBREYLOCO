import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderBio, renderFourLs, renderProjects, renderFooter } from './components/Sections.js';
import { renderPhilosophyDeepDive } from './components/PhilosophyPage.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('philosophy')) {
        renderNavbar();
        renderPhilosophyDeepDive();
        renderFooter();
    } else {
        renderNavbar();
        renderHero();
        renderBio();
        renderFourLs();
        renderProjects();
        renderFooter();
    }
});
