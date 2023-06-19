
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.disabled = true;
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    };
}

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement(task, { onDone, onDelete }) {
    const item = document.createElement('li');

    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (task.done) {
        item.classList.add('list-group-item-success')
    }

    item.textContent = task.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function () {
        onDone({ todoItem: task, element: item });
        item.classList.toggle('list-group-item-success', task.done);
    });

    deleteButton.addEventListener('click', function () {
        onDelete({ todoItem: task, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;
}

async function createTodoApp(container, title, owner, tasks = []) {
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = {
        onDone({ todoItem, element }) {
            console.log(todoItem)
            todoItem.done = !todoItem.done;
            fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ done: todoItem.done }),
                headers: { 'Content-Type': 'application/json' }
            });
        },
        onDelete({ todoItem, element }) {
            if (!confirm('Вы уверены?'))
                return;
            element.remove();
            fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                method: 'DELETE'
            });
        }
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    for (const task of tasks) {
        createTodoItemElement(task, handlers);
    }

    todoItemForm.input.addEventListener('input', function () {
        todoItemForm.button.disabled = todoItemForm.input.value === '';
    })

    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    const todoItemList = await response.json();

    todoItemList.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement);
    });

    todoItemForm.form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!todoItemForm.input.value) {
            return;
        }

        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            body: JSON.stringify({
                name: todoItemForm.input.value.trim(),
                owner,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const todoItem = await response.json();

        // console.log(todoItem.name)

        let todoItemElement = createTodoItemElement(todoItem, handlers);

        todoList.append(todoItemElement);

        todoItemForm.input.value = '';
        todoItemForm.button.disabled = true;
    })
}

export { createTodoApp };
