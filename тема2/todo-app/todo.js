
import { createTodoApp } from '../todo-app/view.js';
function createTodoAppSwitch(modulePath, owner) {
    import(modulePath).then(async module => {
        const todoItemList = await module.getTodoList(owner);
        console.log(owner)
        createTodoApp(document.getElementById('todo-app'), {
            title: 'Мои дела',
            owner,
            todoItemList,
            onCreateFormSubmit: module.createTodoItem,
            onDoneClick: module.switchTodoItemDone,
            onDeleteClick: module.deleteTodoItem
        });
    })
}

function loadPage(methodBtn, btnText, mode, modulePath) {
    methodBtn.textContent = btnText;
    localStorage.setItem('storageMode', mode);
    createTodoAppSwitch(modulePath, methodBtn.dataset.person);
}
document.addEventListener('DOMContentLoaded', () => {

    const methodBtn = document.getElementById('method');
    let storageMode = localStorage.getItem('storageMode') || 'localStorage';

    if (localStorage.getItem('storageMode') == 'localStorage') {
        loadPage(methodBtn, 'Перейти на серверное хранилище', 'localStorage', '../todo-app/localStorage.js');
    }
    else if (localStorage.getItem('storageMode') == 'api') {
        loadPage(methodBtn, 'Перейти на локальноe хранилище', 'api', '../todo-app/api.js');
    }

    methodBtn.addEventListener('click', () => {
        if (localStorage.getItem('storageMode') === 'localStorage') {
            loadPage(methodBtn, 'Перейти на локальноe хранилище', 'api', '../todo-app/api.js');
        }
        else if (localStorage.getItem('storageMode') === 'api') {
            loadPage(methodBtn, 'Перейти на серверное хранилище', 'localStorage', '../todo-app/localStorage.js');
        }

    })
}) 