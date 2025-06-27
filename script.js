const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const todoLimit = 10;

function getTodos() {
  fetch(apiUrl + "?_limit=" + todoLimit)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    });
}

function addTodoToDOM(todo) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.classList.add("todo");
  div.setAttribute("title", todo.id);
  div.setAttribute("data-id", todo.id);

  if (todo.completed) {
    div.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(div);
}

function createTodo(e) {
  e.preventDefault();

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      addTodoToDOM(data);
    });
}

function toggleCompleted(e) {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");

    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
  }
}

function updateTodo(id, completed) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function deleteTodo(e) {
  if (e.target.classList.contains("todo")) {
    const id = e.target.dataset.id;
    // e.target.remove();

    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => e.target.remove());
  }
}

function init() {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.getElementById("todo-form").addEventListener("submit", createTodo);
  document
    .getElementById("todo-list")
    .addEventListener("click", toggleCompleted);
  document.getElementById("todo-list").addEventListener("dblclick", deleteTodo);
}

init();
