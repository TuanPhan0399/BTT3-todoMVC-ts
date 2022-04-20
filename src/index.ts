// Selector
const taskInput = <HTMLInputElement>document.querySelector(".task-input input");
const taskBox = <HTMLUListElement>document.querySelector(".task-box");

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

// window
window.updateStatus = updateStatus;

// Function
function showTodo() {
  let li = "";
  todos.forEach((todo, id) => {
    // if todo status is completed, set the isCompleted value checked
    let isCompleted = todo.taskStatus === "completed" ? "checked" : "";
    li += `<li class="task">
            <div>
              <input onchange="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
              <span ondblclick="editTask(this)" class="${id} ${isCompleted}">${todo.taskValue}</span>
            </div>
            <div class="task-close">
              <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
            </div>
          </li>`;
  });
  taskBox.innerHTML = li;
}
showTodo();

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
    showTodo();
  }
}
