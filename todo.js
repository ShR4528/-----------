const todoForm = document.querySelector('.js-todoForm'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.js-todoList');

const TODOS_LS = 'toDos';
const todos = [];


function loadToDos() {
    const loaded_todos = localStorage.getItem(TODOS_LS);
    if (!loaded_todos !== null) {
        const parsedTodos = JSON.parse(loaded_todos);
        parsedTodos.forEach(function (todo) {
            showTodos(todo.name)
        })
    }
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function deleteTodo(event) {

}

function showTodos(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.addEventListener('click', deleteTodo);
    const span = document.createElement('span');
    const newId = todos.length + 1;
    delBtn.innerHTML = '❌';
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const TodoObject = {
        name: text,
        id: newId
    }
    todos.push(TodoObject);
    saveTodos();


}

function submitHahdler(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    showTodos(currentValue);
    todoInput.value = '';

}

function init() {
    loadToDos();
    todoForm.addEventListener('submit', submitHahdler);
}
init();