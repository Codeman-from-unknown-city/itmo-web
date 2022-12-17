import currentPage from './page.js'

export default function setupEventListeners() {
    let eventsListeners = new Map(
        [
            [
                ['*', '.header__burger', 'click'],
                () => document.querySelector('header')
                              .classList
                              .toggle('menu_active')
            ],
        ]
    );

    eventsListeners.forEach((handler, key, _) => {
        let [page, selector, event] = key;
        if (page == currentPage() || page == '*')
            document.querySelector(selector).addEventListener(event, handler);
    });
}
