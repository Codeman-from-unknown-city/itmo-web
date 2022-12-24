import currentPage from './page.js'
import { addTask, deleteTask, toggleTaskDone } from './todo.js'
import { pullTodos, toggleErrorVisibility } from './fetch.js'

export default function setupEventListeners() {
    let eventsListeners = new Map(
        [
            [
                ['*', '.header__burger', 'click'],
                () => document.querySelector('header')
                              .classList
                              .toggle('menu_active')
            ],
            [
                ['todo', '.todo__task-txt', 'click'], toggleTaskDone
            ],
            [
                ['todo', '.todo__del-icon', 'click'], deleteTask
            ],
            [
                ['todo', '.todo__form', 'submit'], addTask
            ],
            [
                ['todo', '.todo__form', 'submit'], addTask
            ],
            [
                ['todo', '.modal .close', 'click'], toggleErrorVisibility
            ],
            [
                ['todo', '.todo__pull-btn', 'click'], pullTodos
            ],
        ]
    );

    eventsListeners.forEach((handler, key, _) => {
        let [page, selector, event] = key;
        if (page == currentPage() || page == '*') {
            document.querySelectorAll(selector).forEach(
                el => el.addEventListener(event, handler)
            );
        }
    });
}
