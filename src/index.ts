interface Todo {
  taskValue: string;
  taskStatus: string;
}
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
let todos: Todo[] = JSON.parse(localStorage.getItem("todo-list") || "[]");
let taskInfo: Todo;

// Event Listener
taskInput.addEventListener("keyup", saveTask);
clearAll.addEventListener("click", clearAllCompleted);

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
      if (todo.taskStatus === "completed") {
        clearAll.style.opacity = "1";
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
  let liTask = <HTMLLIElement>selectedTask.parentElement?.parentElement;
  // Getting paragraph that contains task name
  let taskName = <HTMLSpanElement>selectedTask.parentElement?.lastElementChild;
  const filterStatus = Array.from(filters);
  let filterActive = filterStatus.filter((e) => e.classList[0] === "active");
  // Getting ID
  let id = Number(selectedTask.id);

  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[id].taskStatus = "completed";
    clearAll.style.opacity = "1";
    countIndex -= 1;
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[id].taskStatus = "pending";
    countIndex += 1;
  }
  // tick all
  let todo = todos.filter((todo) => todo.taskStatus === "completed");
  if (todo.length === todos.length) {
    iTaskInput.classList.add("tick-all");
  } else {
    iTaskInput.classList.remove("tick-all");
  }
  // fix clear all
  let todoPending = todos.filter(
    (todoPending) => todoPending.taskStatus === "pending"
  );
  if (todoPending.length === todos.length) {
    clearAll.style.opacity = "0";
  }
  // fix bug active
  if (filterActive[0].id === "completed" && selectedTask.checked === false) {
    liTask.style.display = "none";
  } else if (filterActive[0].id === "pending" && selectedTask.checked) {
    liTask.style.display = "none";
  } else if (filterActive[0].id === "all") {
    liTask.style.display = "flex";
  }
  count.innerText = countIndex.toString();
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
console.log(typeof todos);
// clear all
function clearAllCompleted() {
  // removing selected task
  const todos2 = todos.filter((todo) => todo.taskStatus !== "completed");
  todos = todos2;
  if (todos.length === 0) {
    iTaskInput.style.display = "none";
    controls.style.display = "none";
  }
  clearAll.style.opacity = "0";
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(idFilter);
}
