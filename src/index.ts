// Selector
const taskInput = <HTMLInputElement>document.querySelector(".task-input input");
const taskBox = <HTMLUListElement>document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters > span");
const controls = <HTMLDivElement>document.querySelector(".controls");
const iTaskInput = <HTMLIFrameElement>document.querySelector(".task-input i");
const clearAll = <HTMLButtonElement>document.querySelector(".clear-btn");
let count = <HTMLSpanElement>document.querySelector(".count");

// Variable
let countIndex: number;
let idFilter: string = "all";

// getting localstorage todo-list
let todos: [
  {
    taskValue: string;
    taskStatus: string;
  }
] = JSON.parse(localStorage.getItem("todo-list") || "[]");
let taskInfo: {
  taskValue: string;
  taskStatus: string;
};

// Event Listener
taskInput.addEventListener("keyup", saveTask);

// Work with filters
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active")?.classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
    return (idFilter = btn.id);
  });
});

// window
window.updateStatus = updateStatus;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.editSpan = editSpan;

// Function
function showTodo(filter: string) {
  let li = "";
  let todo: object;
  countIndex = todos.length;
  if (todos) {
    todos.forEach((todo, id) => {
      // handle count
      if (todo.taskStatus === "completed") {
        countIndex -= 1;
      }
      // if todo status is completed, set the isCompleted value checked
      let isCompleted = todo.taskStatus === "completed" ? "checked" : "";
      if (filter === todo.taskStatus || filter === "all") {
        li += `<li class="task">
                <div>
                  <input onchange="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                  <span ondblclick="editTask(this)" class="${id} ${isCompleted}">${todo.taskValue}</span>
                </div>
                <div class="task-close">
                  <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
                </div>
              </li>`;
      }
    });
  }
  todo = todos.filter((todo) => todo.taskStatus === "completed");

  taskBox.innerHTML = li;

  if (todos.length > 0) {
    controls.style.display = "flex";
    count.innerText = countIndex.toString();
  } else {
    controls.style.display = "none";
  }
}
showTodo(idFilter);

// check iput
function updateStatus(selectedTask: HTMLInputElement) {
  // Getting paragraph that contains task name
  let taskName = <HTMLSpanElement>selectedTask.parentElement?.lastElementChild;
  // Getting ID
  let id = Number(selectedTask.id);

  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[id].taskStatus = "completed";
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[id].taskStatus = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Save to local
function saveTask(e: KeyboardEvent) {
  // Do not take spaces and null characters
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    taskInput.value = "";
    // Add one task new on todos
    taskInfo = {
      taskValue: userTask,
      taskStatus: "pending",
    };
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(idFilter);
  }
}

// Deleted task
function deleteTask(deleteID: number) {
  // remove selected task
  todos.splice(deleteID, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(idFilter);
}

// Data editing function
function editTask(span: HTMLSpanElement) {
  const taskClose = <HTMLDivElement>(
    span.parentElement?.parentElement?.lastElementChild
  );
  const input = <HTMLInputElement>span.parentElement?.firstElementChild;
  taskClose.style.opacity = "0";
  input.style.opacity = "0";
  let valueInput: string = span.innerText;
  span.innerText = "";
  span.innerHTML += `<input onclick="editSpan(this)" type="text" value="${valueInput}"></input>`;
}

// new data editting add with local
function editSpan(input: HTMLInputElement) {
  const span = <HTMLSpanElement>input.parentElement;
  const tickInput = <HTMLInputElement>span.parentElement?.firstElementChild;
  const taskClose = <HTMLDivElement>(
    span.parentElement?.parentElement?.lastElementChild
  );
  const id = Number(span.classList[0]);

  // add enter
  input.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "Enter" && input.value.trim()) {
      event.preventDefault();
      span.innerText = input.value.trim();
      input.style.display = "none";
      taskClose.style.opacity = "1";
      tickInput.style.opacity = "1";
      todos[id].taskValue = span.innerText;
      localStorage.setItem("todo-list", JSON.stringify(todos));
    } else if (event.key === "Enter" && input.value === "") {
      todos.splice(id, 1);
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo(idFilter);
    }
  });
  // add blur
  input.addEventListener("blur", (event) => {
    if (input.value.trim()) {
      event.preventDefault();
      span.innerText = input.value.trim();
      input.style.display = "none";
      taskClose.style.opacity = "1";
      tickInput.style.opacity = "1";
      todos[id].taskValue = span.innerText;
    } else {
      todos.splice(id, 1);
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(idFilter);
  });
}
