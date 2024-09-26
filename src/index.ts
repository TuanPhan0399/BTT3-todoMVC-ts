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
iTaskInput.addEventListener("click", takeAll);

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

// Function
function showTodo(filter: string) {
  let li = "";
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
                  <input ondblclick="editTask(this)" type="text" value="${todo.taskValue}" class="${id} ${isCompleted}" readOnly>
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
  let todo = todos.filter((todo) => todo.taskStatus === "completed");
  if (todo.length === todos.length) {
    iTaskInput.classList.add("tick-all");
  } else {
    iTaskInput.classList.remove("tick-all");
  }
  taskBox.innerHTML = li;

  if (todos.length > 0) {
    controls.style.display = "flex";
    iTaskInput.style.display = "block";
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
    iTaskInput.classList.remove("tick-all");
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
  if (todos.length === 0) {
    controls.style.display = "none";
    iTaskInput.style.display = "none";
  }
  let todo2 = todos.filter((todo) => todo.taskStatus === "completed");
  if (todo2.length === 0) {
    clearAll.style.opacity = "0";
  }
  showTodo(idFilter);
}

// Data editing function
function editTask(input: HTMLInputElement) {
  const taskClose = <HTMLDivElement>(
    input.parentElement?.parentElement?.lastElementChild
  );
  const inputCheck = <HTMLInputElement>input.parentElement?.firstElementChild;
  const id = Number(input.classList[0]);
  taskClose.style.opacity = "0";
  inputCheck.style.opacity = "0";
  input.style.border = "1px solid #999";
  input.readOnly = false;
  input.setSelectionRange(input.value.length, input.value.length);
  if (input.classList.contains("checked")) {
    input.classList.remove("checked");
    input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        input.removeEventListener("blur", onBlur);
        if (input.value.trim()) {
          // fix bug edit input and task close;
          taskClose.style.opacity = "1";
          inputCheck.style.opacity = "1";
          todos[id].taskValue = input.value.trim();
          input.classList.add("checked");
          localStorage.setItem("todo-list", JSON.stringify(todos));
          showTodo(idFilter);
        } else {
          todos.splice(id, 1);
          let todos2 = todos.filter((todo) => todo.taskStatus === "completed");
          if (todos2.length === 0) {
            clearAll.style.opacity = "0";
          }
          if (todos.length === 0) {
            iTaskInput.style.display = "none";
          }
          localStorage.setItem("todo-list", JSON.stringify(todos));
          showTodo(idFilter);
        }
      }
    });

    // add onblur
    input.addEventListener("blur", onBlur);
    function onBlur() {
      if (input.value.trim()) {
        // fix bug edit input and task close;
        taskClose.style.opacity = "1";
        inputCheck.style.opacity = "1";
        todos[id].taskValue = input.value.trim();
        input.classList.add("checked");
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      } else {
        todos.splice(id, 1);
        let todos2 = todos.filter((todo) => todo.taskStatus === "completed");
        if (todos2.length === 0) {
          clearAll.style.opacity = "0";
        }
        if (todos.length === 0) {
          iTaskInput.style.display = "none";
        }
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      }
    }
  } else {
    input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        input.removeEventListener("blur", onBlur);
        if (input.value.trim()) {
          // fix bug edit input and task close;
          taskClose.style.opacity = "1";
          inputCheck.style.opacity = "1";
          todos[id].taskValue = input.value.trim();
          localStorage.setItem("todo-list", JSON.stringify(todos));
          showTodo(idFilter);
        } else {
          todos.splice(id, 1);
          let todos2 = todos.filter((todo) => todo.taskStatus === "completed");
          if (todos2.length === 0) {
            clearAll.style.opacity = "0";
          }
          if (todos.length === 0) {
            iTaskInput.style.display = "none";
          }
          localStorage.setItem("todo-list", JSON.stringify(todos));
          showTodo(idFilter);
        }
      }
    });

    // add onblur
    input.addEventListener("blur", onBlur);
    function onBlur() {
      if (input.value.trim()) {
        // fix bug edit input and task close;
        taskClose.style.opacity = "1";
        inputCheck.style.opacity = "1";
        todos[id].taskValue = input.value.trim();
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      } else {
        todos.splice(id, 1);
        let todos2 = todos.filter((todo) => todo.taskStatus === "completed");
        if (todos2.length === 0) {
          clearAll.style.opacity = "0";
        }
        if (todos.length === 0) {
          iTaskInput.style.display = "none";
        }
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      }
    }
  }
}

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

// select all input
function takeAll() {
  if (iTaskInput.classList.contains("tick-all") === false) {
    clearAll.style.opacity = "1";
    iTaskInput.classList.add("tick-all");
    todos.forEach((todo) => {
      todo.taskStatus = "completed";
    });
  } else {
    clearAll.style.opacity = "0";
    iTaskInput.classList.remove("tick-all");
    todos.forEach((todo) => {
      todo.taskStatus = "pending";
    });
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(idFilter);
}
