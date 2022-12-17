import currentPage from './page.js'
import setupEventListeners from './event.js'

function setActiveMenuItem() {
    for (let menuLink of document.querySelectorAll('.menu__item')) {
        if (menuLink.textContent.toLowerCase() == currentPage()) {
            menuLink.classList.add('menu__item_active');
            return;
        }
    }

    console.error(`"${currentPage()}" not found in menu items`);
}

(function main() {
    setActiveMenuItem();
    setupEventListeners();
})();
