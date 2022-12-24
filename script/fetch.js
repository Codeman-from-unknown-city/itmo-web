import { addTaskEl, genTaskId } from "./todo.js";

function togglePreloader() {
    document.querySelector('.shadow')
            .classList
            .toggle('shadow_visible');

    document.querySelector('.lds-dual-ring')
            .classList
            .toggle('lds-dual-ring_visible');
}

export function toggleErrorVisibility() {
    document.querySelector('.modal').classList.toggle('modal_visible');
}

export function pullTodos() {
    togglePreloader();
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(respone => {
            if (!respone.ok)
                throw new Error();
            
            return respone.json()
        })
        .then(todo => {
            let rnd = Math.floor(Math.random() * 10);   
            todo.forEach((el, idx) => {
                if (idx % rnd != 0)
                    return;

                addTaskEl(genTaskId(), el['title'], el['completed']);
            })
        })
        .catch(toggleErrorVisibility)
        .finally(togglePreloader);
}
