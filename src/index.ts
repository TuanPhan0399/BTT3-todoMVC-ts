// Selector
const taskInput = <HTMLInputElement>document.querySelector(".task-input input");

// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list") || "[]");
let taskInfo: {
  taskValue: string;
  taskStatus: string;
};

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    taskInput.value = "";
    taskInfo = {
      taskValue: userTask,
      taskStatus: "pending",
    };
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
  }
});
