document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function saveTasks() {
  const todoList = document.getElementById("todo-list").innerHTML;
  const inProgressList = document.getElementById("in-progress-list").innerHTML;
  const doneList = document.getElementById("done-list").innerHTML;

  localStorage.setItem("todoList", todoList);
  localStorage.setItem("inProgressList", inProgressList);
  localStorage.setItem("doneList", doneList);
}

function loadTasks() {
  const todoList = localStorage.getItem("todoList");
  const inProgressList = localStorage.getItem("inProgressList");
  const doneList = localStorage.getItem("doneList");

  document.getElementById("todo-list").innerHTML = todoList || "";
  document.getElementById("in-progress-list").innerHTML = inProgressList || "";
  document.getElementById("done-list").innerHTML = doneList || "";

  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
    task.style.display = "grid";
    const deleteButton = task.querySelector(".delete-button");
    deleteButton.addEventListener("click", deleteTask);

    const editButton = task.querySelector(".edit-button");
    editButton.addEventListener("click", editTask);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;

    const taskContent = document.createElement("div");
    taskContent.className = "task-content"; // Corrected class name
    taskContent.textContent = taskText;
    task.appendChild(taskContent);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", editTask);
    task.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", deleteTask);
    task.appendChild(deleteButton);

    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(task);

    taskInput.value = "";
    saveTasks();
  }
}
function deleteTask() {
  const task = this.parentElement;
  task.remove();
  saveTasks();
}

function editTask() {
  const task = this.parentElement;
  const taskContent = task.querySelector(".task-content");
  const newTaskText = prompt("Edit the task:", taskContent.textContent.trim());

  if (newTaskText !== null && newTaskText !== "") {
    taskContent.textContent = newTaskText;
    saveTasks();
  }
}

let dragTask = null;

function dragStart() {
  dragTask = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
}

function dragEnd() {
  this.style.display = "grid";
  dragTask = null;
  saveTasks();
}

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  if (dragTask) {
    const targetColumn = e.target.closest(".kanban-column");
    if (targetColumn) {
      targetColumn.querySelector(".task-list").appendChild(dragTask);
    }
  }
  saveTasks();
});

document.querySelector(".add-task").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

window.addEventListener("load", () => {
  document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.keyCode == 123) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
});

const header = document.getElementById("header");
header.addEventListener("mouseover", () => {
  header.style.cursor = "pointer";
});
header.addEventListener("click", () => {
  location.reload;
});
