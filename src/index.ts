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

//function

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
function showTodo() {
  let li = "";
  todos.forEach((todo, id) => {
    li += `<li class="task">
            <div>
              <input onclick="updateStatus(this)" type="checkbox" id="${id}">
              <span ondblclick="editTask(this)" class="${id}">${todo.taskValue}</span>
            </div>
            <div class="task-close">
              <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
            </div>
          </li>`;
  });
  taskBox.innerHTML = li;
}
showTodo();
