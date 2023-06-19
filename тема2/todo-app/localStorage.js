export let  STORAGE_KEY = '';

function updateStorage(tasks, storageKey) {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}

export function getTodoList(storageKey) {
    STORAGE_KEY = storageKey ? null : storageKey;
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
}

export function createTodoItem({ owner, name }) {
    const myTask = { name: name, done: false };
    const tasks = getTodoList(STORAGE_KEY) || [];
    tasks.push(myTask);
    updateStorage(tasks, STORAGE_KEY);
    return myTask;
}

export function switchTodoItemDone({ todoItem, element }) {
    const tasks = getTodoList(STORAGE_KEY);
    const index = tasks.findIndex(x => x.name === todoItem.name);
    tasks[index].done = !tasks[index].done;
    updateStorage(tasks, STORAGE_KEY);
}

export function deleteTodoItem({ element, todoItem }) {
    if (confirm('Вы уверены?')) {
        let tasks = getTodoList(STORAGE_KEY);
        tasks = tasks.filter(x => x.name != todoItem.name);
        updateStorage(tasks, STORAGE_KEY);
        element.remove();
    }
}