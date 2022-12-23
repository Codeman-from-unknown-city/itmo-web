import currentPage from "./page.js";

let extractNumId = taskId => parseInt(taskId.split('-').at(-1), 10);

function addTaskEl(id, value, done) {
    let li = document.createElement('li');
    li.className = 'todo__li';

    let checkbox = document.createElement('input');
    let checkboxId = `todo-checkbox-${id}`
    checkbox.className = 'todo__checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = done;

    let label = document.createElement('label');
    label.className = 'todo__task-txt';
    label.setAttribute('for', checkboxId);
    label.append(value);
    label.addEventListener('click', toggleTaskDone);
    if (done)
        label.classList.add('todo__task-txt_done');

    let delIcon = document.createElement('div');
    delIcon.className = 'todo__del-icon';
    delIcon.innerHTML = '&#10005;';
    delIcon.addEventListener('click', deleteTask);

    let list = document.querySelector('.todo__list');
    if (!list.childElementCount)
        list.classList.toggle('todo__list_invisible');

    li.append(checkbox, label, delIcon);
    list.append(li);
}

export function toggleTaskDone(event) {
    let taskEl = event.currentTarget;
    taskEl.classList.toggle('todo__task-txt_done');

    window.localStorage
          .setItem(extractNumId(taskEl.getAttribute('for')), JSON.stringify({
              'task': taskEl.textContent,
              done: taskEl.classList.contains('todo__task-txt_done')
          }));
}

export function deleteTask(event) {
    let parent = event.currentTarget.parentNode;
    let taskEl = parent.querySelector('label');
    window.localStorage.removeItem(extractNumId(taskEl.getAttribute('for')));
    parent.remove();

    let list = document.querySelector('.todo__list');
    if (!list.childElementCount)
        list.classList.toggle('todo__list_invisible');
}

export function addTask(event) {
    event.preventDefault();

    let task = event.currentTarget.task.value;
    event.currentTarget.task.value = "";
    if (!task.trim().length)
        return;

    let nextId = -1;
    document.querySelectorAll('.todo__checkbox').forEach(
        el => {
            let currId = extractNumId(el.id);
            if (currId > nextId)
                nextId = currId;
        }
    );
    nextId++;

    addTaskEl(nextId, task, false);

    window.localStorage
          .setItem(nextId, JSON.stringify({task, done: false}));
}

(function restoreList() {
    if (currentPage() != 'todo')
        return;

    let storage = window.localStorage;
    for (let i = 0; i < storage.length; i++) {
        let id = storage.key(i);
        let taskInfo = JSON.parse(localStorage.getItem(id))
        addTaskEl(id, taskInfo['task'], taskInfo['done']);
    }
})();
