/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\n// Selector\nconst taskInput = document.querySelector(\".task-input input\");\nconst taskBox = document.querySelector(\".task-box\");\nconst filters = document.querySelectorAll(\".filters > span\");\nconst controls = document.querySelector(\".controls\");\nconst iTaskInput = document.querySelector(\".task-input i\");\nconst clearAll = document.querySelector(\".clear-btn\");\nlet count = document.querySelector(\".count\");\n// Variable\nlet countIndex;\nlet idFilter = \"all\";\n// getting localstorage todo-list\nlet todos = JSON.parse(localStorage.getItem(\"todo-list\") || \"[]\");\nlet taskInfo;\n// Event Listener\ntaskInput.addEventListener(\"keyup\", saveTask);\nclearAll.addEventListener(\"click\", clearAllCompleted);\n// Work with filters\nfilters.forEach((btn) => {\n    btn.addEventListener(\"click\", () => {\n        var _a;\n        (_a = document.querySelector(\"span.active\")) === null || _a === void 0 ? void 0 : _a.classList.remove(\"active\");\n        btn.classList.add(\"active\");\n        showTodo(btn.id);\n        return (idFilter = btn.id);\n    });\n});\n// window\nwindow.updateStatus = updateStatus;\nwindow.deleteTask = deleteTask;\nwindow.editTask = editTask;\nwindow.editSpan = editSpan;\n// Function\nfunction showTodo(filter) {\n    let li = \"\";\n    let todo;\n    countIndex = todos.length;\n    if (todos) {\n        todos.forEach((todo, id) => {\n            // handle count\n            if (todo.taskStatus === \"completed\") {\n                countIndex -= 1;\n            }\n            // if todo status is completed, set the isCompleted value checked\n            let isCompleted = todo.taskStatus === \"completed\" ? \"checked\" : \"\";\n            if (filter === todo.taskStatus || filter === \"all\") {\n                li += `<li class=\"task\">\n                <div>\n                  <input onchange=\"updateStatus(this)\" type=\"checkbox\" id=\"${id}\" ${isCompleted}>\n                  <span ondblclick=\"editTask(this)\" class=\"${id} ${isCompleted}\">${todo.taskValue}</span>\n                </div>\n                <div class=\"task-close\">\n                  <i onclick=\"deleteTask(${id})\" class=\"fa-solid fa-xmark\"></i>\n                </div>\n              </li>`;\n            }\n            if (todo.taskStatus === \"completed\") {\n                clearAll.style.opacity = \"1\";\n            }\n        });\n    }\n    todo = todos.filter((todo) => todo.taskStatus === \"completed\");\n    taskBox.innerHTML = li;\n    if (todos.length > 0) {\n        controls.style.display = \"flex\";\n        count.innerText = countIndex.toString();\n    }\n    else {\n        controls.style.display = \"none\";\n    }\n}\nshowTodo(idFilter);\n// check iput\nfunction updateStatus(selectedTask) {\n    var _a, _b;\n    let liTask = (_a = selectedTask.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;\n    // Getting paragraph that contains task name\n    let taskName = (_b = selectedTask.parentElement) === null || _b === void 0 ? void 0 : _b.lastElementChild;\n    const filterStatus = Array.from(filters);\n    let filterActive = filterStatus.filter((e) => e.classList[0] === \"active\");\n    // Getting ID\n    let id = Number(selectedTask.id);\n    if (selectedTask.checked) {\n        taskName.classList.add(\"checked\");\n        // updating the status of selected task to completed\n        todos[id].taskStatus = \"completed\";\n        clearAll.style.opacity = \"1\";\n        countIndex -= 1;\n    }\n    else {\n        taskName.classList.remove(\"checked\");\n        // updating the status of selected task to pending\n        todos[id].taskStatus = \"pending\";\n        countIndex += 1;\n    }\n    // tick all\n    let todo = todos.filter((todo) => todo.taskStatus === \"completed\");\n    if (todo.length === todos.length) {\n        iTaskInput.classList.add(\"tick-all\");\n    }\n    else {\n        iTaskInput.classList.remove(\"tick-all\");\n    }\n    // fix clear all\n    let todoPending = todos.filter((todoPending) => todoPending.taskStatus === \"pending\");\n    if (todoPending.length === todos.length) {\n        clearAll.style.opacity = \"0\";\n    }\n    // fix bug active\n    if (filterActive[0].id === \"completed\" && selectedTask.checked === false) {\n        liTask.style.display = \"none\";\n    }\n    else if (filterActive[0].id === \"pending\" && selectedTask.checked) {\n        liTask.style.display = \"none\";\n    }\n    else if (filterActive[0].id === \"all\") {\n        liTask.style.display = \"flex\";\n    }\n    count.innerText = countIndex.toString();\n    localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n}\n// Save to local\nfunction saveTask(e) {\n    // Do not take spaces and null characters\n    let userTask = taskInput.value.trim();\n    if (e.key === \"Enter\" && userTask) {\n        taskInput.value = \"\";\n        // Add one task new on todos\n        taskInfo = {\n            taskValue: userTask,\n            taskStatus: \"pending\",\n        };\n        todos.push(taskInfo);\n        localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n        showTodo(idFilter);\n    }\n}\n// Deleted task\nfunction deleteTask(deleteID) {\n    // remove selected task\n    todos.splice(deleteID, 1);\n    localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n    showTodo(idFilter);\n}\n// Data editing function\nfunction editTask(span) {\n    var _a, _b, _c;\n    const taskClose = ((_b = (_a = span.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.lastElementChild);\n    const input = (_c = span.parentElement) === null || _c === void 0 ? void 0 : _c.firstElementChild;\n    taskClose.style.opacity = \"0\";\n    input.style.opacity = \"0\";\n    let valueInput = span.innerText;\n    span.innerText = \"\";\n    span.innerHTML += `<input onclick=\"editSpan(this)\" type=\"text\" value=\"${valueInput}\"></input>`;\n}\n// new data editting add with local\nfunction editSpan(input) {\n    var _a, _b, _c;\n    const span = input.parentElement;\n    const tickInput = (_a = span.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild;\n    const taskClose = ((_c = (_b = span.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.lastElementChild);\n    const id = Number(span.classList[0]);\n    // add enter\n    input.addEventListener(\"keyup\", (event) => {\n        if (event.key === \"Enter\" && input.value.trim()) {\n            event.preventDefault();\n            span.innerText = input.value.trim();\n            input.style.display = \"none\";\n            taskClose.style.opacity = \"1\";\n            tickInput.style.opacity = \"1\";\n            todos[id].taskValue = span.innerText;\n            localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n        }\n        else if (event.key === \"Enter\" && input.value === \"\") {\n            todos.splice(id, 1);\n            localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n            showTodo(idFilter);\n        }\n    });\n    // add blur\n    input.addEventListener(\"blur\", (event) => {\n        if (input.value.trim()) {\n            event.preventDefault();\n            span.innerText = input.value.trim();\n            input.style.display = \"none\";\n            taskClose.style.opacity = \"1\";\n            tickInput.style.opacity = \"1\";\n            todos[id].taskValue = span.innerText;\n        }\n        else {\n            todos.splice(id, 1);\n        }\n        localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n        showTodo(idFilter);\n    });\n}\nconsole.log(typeof todos);\n// clear all\nfunction clearAllCompleted() {\n    // removing selected task\n    const todos2 = todos.filter((todo) => todo.taskStatus !== \"completed\");\n    todos = todos2;\n    if (todos.length === 0) {\n        iTaskInput.style.display = \"none\";\n        controls.style.display = \"none\";\n    }\n    clearAll.style.opacity = \"0\";\n    localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n    showTodo(idFilter);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLEdBQUcsSUFBSSxZQUFZO0FBQ2hHLDZEQUE2RCxJQUFJLEVBQUUsWUFBWSxJQUFJLGVBQWU7QUFDbEc7QUFDQTtBQUNBLDJDQUEyQyxHQUFHO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsV0FBVztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdHlwZXNjcmlwdC8uL3NyYy9pbmRleC50cz9lOTRlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gU2VsZWN0b3JcbmNvbnN0IHRhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pbnB1dCBpbnB1dFwiKTtcbmNvbnN0IHRhc2tCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYm94XCIpO1xuY29uc3QgZmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVycyA+IHNwYW5cIik7XG5jb25zdCBjb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIik7XG5jb25zdCBpVGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWlucHV0IGlcIik7XG5jb25zdCBjbGVhckFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItYnRuXCIpO1xubGV0IGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb3VudFwiKTtcbi8vIFZhcmlhYmxlXG5sZXQgY291bnRJbmRleDtcbmxldCBpZEZpbHRlciA9IFwiYWxsXCI7XG4vLyBnZXR0aW5nIGxvY2Fsc3RvcmFnZSB0b2RvLWxpc3RcbmxldCB0b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvLWxpc3RcIikgfHwgXCJbXVwiKTtcbmxldCB0YXNrSW5mbztcbi8vIEV2ZW50IExpc3RlbmVyXG50YXNrSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHNhdmVUYXNrKTtcbmNsZWFyQWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckFsbENvbXBsZXRlZCk7XG4vLyBXb3JrIHdpdGggZmlsdGVyc1xuZmlsdGVycy5mb3JFYWNoKChidG4pID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3Bhbi5hY3RpdmVcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgc2hvd1RvZG8oYnRuLmlkKTtcbiAgICAgICAgcmV0dXJuIChpZEZpbHRlciA9IGJ0bi5pZCk7XG4gICAgfSk7XG59KTtcbi8vIHdpbmRvd1xud2luZG93LnVwZGF0ZVN0YXR1cyA9IHVwZGF0ZVN0YXR1cztcbndpbmRvdy5kZWxldGVUYXNrID0gZGVsZXRlVGFzaztcbndpbmRvdy5lZGl0VGFzayA9IGVkaXRUYXNrO1xud2luZG93LmVkaXRTcGFuID0gZWRpdFNwYW47XG4vLyBGdW5jdGlvblxuZnVuY3Rpb24gc2hvd1RvZG8oZmlsdGVyKSB7XG4gICAgbGV0IGxpID0gXCJcIjtcbiAgICBsZXQgdG9kbztcbiAgICBjb3VudEluZGV4ID0gdG9kb3MubGVuZ3RoO1xuICAgIGlmICh0b2Rvcykge1xuICAgICAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvLCBpZCkgPT4ge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGNvdW50XG4gICAgICAgICAgICBpZiAodG9kby50YXNrU3RhdHVzID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICAgICAgICAgICAgY291bnRJbmRleCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgdG9kbyBzdGF0dXMgaXMgY29tcGxldGVkLCBzZXQgdGhlIGlzQ29tcGxldGVkIHZhbHVlIGNoZWNrZWRcbiAgICAgICAgICAgIGxldCBpc0NvbXBsZXRlZCA9IHRvZG8udGFza1N0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIiA/IFwiY2hlY2tlZFwiIDogXCJcIjtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgPT09IHRvZG8udGFza1N0YXR1cyB8fCBmaWx0ZXIgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgICAgICAgICBsaSArPSBgPGxpIGNsYXNzPVwidGFza1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgb25jaGFuZ2U9XCJ1cGRhdGVTdGF0dXModGhpcylcIiB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7aWR9XCIgJHtpc0NvbXBsZXRlZH0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBvbmRibGNsaWNrPVwiZWRpdFRhc2sodGhpcylcIiBjbGFzcz1cIiR7aWR9ICR7aXNDb21wbGV0ZWR9XCI+JHt0b2RvLnRhc2tWYWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stY2xvc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxpIG9uY2xpY2s9XCJkZWxldGVUYXNrKCR7aWR9KVwiIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2RvLnRhc2tTdGF0dXMgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckFsbC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0b2RvID0gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRhc2tTdGF0dXMgPT09IFwiY29tcGxldGVkXCIpO1xuICAgIHRhc2tCb3guaW5uZXJIVE1MID0gbGk7XG4gICAgaWYgKHRvZG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBjb3VudC5pbm5lclRleHQgPSBjb3VudEluZGV4LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxufVxuc2hvd1RvZG8oaWRGaWx0ZXIpO1xuLy8gY2hlY2sgaXB1dFxuZnVuY3Rpb24gdXBkYXRlU3RhdHVzKHNlbGVjdGVkVGFzaykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgbGV0IGxpVGFzayA9IChfYSA9IHNlbGVjdGVkVGFzay5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50RWxlbWVudDtcbiAgICAvLyBHZXR0aW5nIHBhcmFncmFwaCB0aGF0IGNvbnRhaW5zIHRhc2sgbmFtZVxuICAgIGxldCB0YXNrTmFtZSA9IChfYiA9IHNlbGVjdGVkVGFzay5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGFzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBmaWx0ZXJTdGF0dXMgPSBBcnJheS5mcm9tKGZpbHRlcnMpO1xuICAgIGxldCBmaWx0ZXJBY3RpdmUgPSBmaWx0ZXJTdGF0dXMuZmlsdGVyKChlKSA9PiBlLmNsYXNzTGlzdFswXSA9PT0gXCJhY3RpdmVcIik7XG4gICAgLy8gR2V0dGluZyBJRFxuICAgIGxldCBpZCA9IE51bWJlcihzZWxlY3RlZFRhc2suaWQpO1xuICAgIGlmIChzZWxlY3RlZFRhc2suY2hlY2tlZCkge1xuICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcbiAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHN0YXR1cyBvZiBzZWxlY3RlZCB0YXNrIHRvIGNvbXBsZXRlZFxuICAgICAgICB0b2Rvc1tpZF0udGFza1N0YXR1cyA9IFwiY29tcGxldGVkXCI7XG4gICAgICAgIGNsZWFyQWxsLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgY291bnRJbmRleCAtPSAxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LnJlbW92ZShcImNoZWNrZWRcIik7XG4gICAgICAgIC8vIHVwZGF0aW5nIHRoZSBzdGF0dXMgb2Ygc2VsZWN0ZWQgdGFzayB0byBwZW5kaW5nXG4gICAgICAgIHRvZG9zW2lkXS50YXNrU3RhdHVzID0gXCJwZW5kaW5nXCI7XG4gICAgICAgIGNvdW50SW5kZXggKz0gMTtcbiAgICB9XG4gICAgLy8gdGljayBhbGxcbiAgICBsZXQgdG9kbyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50YXNrU3RhdHVzID09PSBcImNvbXBsZXRlZFwiKTtcbiAgICBpZiAodG9kby5sZW5ndGggPT09IHRvZG9zLmxlbmd0aCkge1xuICAgICAgICBpVGFza0lucHV0LmNsYXNzTGlzdC5hZGQoXCJ0aWNrLWFsbFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlUYXNrSW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcInRpY2stYWxsXCIpO1xuICAgIH1cbiAgICAvLyBmaXggY2xlYXIgYWxsXG4gICAgbGV0IHRvZG9QZW5kaW5nID0gdG9kb3MuZmlsdGVyKCh0b2RvUGVuZGluZykgPT4gdG9kb1BlbmRpbmcudGFza1N0YXR1cyA9PT0gXCJwZW5kaW5nXCIpO1xuICAgIGlmICh0b2RvUGVuZGluZy5sZW5ndGggPT09IHRvZG9zLmxlbmd0aCkge1xuICAgICAgICBjbGVhckFsbC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgfVxuICAgIC8vIGZpeCBidWcgYWN0aXZlXG4gICAgaWYgKGZpbHRlckFjdGl2ZVswXS5pZCA9PT0gXCJjb21wbGV0ZWRcIiAmJiBzZWxlY3RlZFRhc2suY2hlY2tlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbGlUYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlsdGVyQWN0aXZlWzBdLmlkID09PSBcInBlbmRpbmdcIiAmJiBzZWxlY3RlZFRhc2suY2hlY2tlZCkge1xuICAgICAgICBsaVRhc2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChmaWx0ZXJBY3RpdmVbMF0uaWQgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgbGlUYXNrLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9XG4gICAgY291bnQuaW5uZXJUZXh0ID0gY291bnRJbmRleC50b1N0cmluZygpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kby1saXN0XCIsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG59XG4vLyBTYXZlIHRvIGxvY2FsXG5mdW5jdGlvbiBzYXZlVGFzayhlKSB7XG4gICAgLy8gRG8gbm90IHRha2Ugc3BhY2VzIGFuZCBudWxsIGNoYXJhY3RlcnNcbiAgICBsZXQgdXNlclRhc2sgPSB0YXNrSW5wdXQudmFsdWUudHJpbSgpO1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiICYmIHVzZXJUYXNrKSB7XG4gICAgICAgIHRhc2tJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIC8vIEFkZCBvbmUgdGFzayBuZXcgb24gdG9kb3NcbiAgICAgICAgdGFza0luZm8gPSB7XG4gICAgICAgICAgICB0YXNrVmFsdWU6IHVzZXJUYXNrLFxuICAgICAgICAgICAgdGFza1N0YXR1czogXCJwZW5kaW5nXCIsXG4gICAgICAgIH07XG4gICAgICAgIHRvZG9zLnB1c2godGFza0luZm8pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG8tbGlzdFwiLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgICAgICBzaG93VG9kbyhpZEZpbHRlcik7XG4gICAgfVxufVxuLy8gRGVsZXRlZCB0YXNrXG5mdW5jdGlvbiBkZWxldGVUYXNrKGRlbGV0ZUlEKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGVjdGVkIHRhc2tcbiAgICB0b2Rvcy5zcGxpY2UoZGVsZXRlSUQsIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kby1saXN0XCIsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgc2hvd1RvZG8oaWRGaWx0ZXIpO1xufVxuLy8gRGF0YSBlZGl0aW5nIGZ1bmN0aW9uXG5mdW5jdGlvbiBlZGl0VGFzayhzcGFuKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgY29uc3QgdGFza0Nsb3NlID0gKChfYiA9IChfYSA9IHNwYW4ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sYXN0RWxlbWVudENoaWxkKTtcbiAgICBjb25zdCBpbnB1dCA9IChfYyA9IHNwYW4ucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHRhc2tDbG9zZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgaW5wdXQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIGxldCB2YWx1ZUlucHV0ID0gc3Bhbi5pbm5lclRleHQ7XG4gICAgc3Bhbi5pbm5lclRleHQgPSBcIlwiO1xuICAgIHNwYW4uaW5uZXJIVE1MICs9IGA8aW5wdXQgb25jbGljaz1cImVkaXRTcGFuKHRoaXMpXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dmFsdWVJbnB1dH1cIj48L2lucHV0PmA7XG59XG4vLyBuZXcgZGF0YSBlZGl0dGluZyBhZGQgd2l0aCBsb2NhbFxuZnVuY3Rpb24gZWRpdFNwYW4oaW5wdXQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICBjb25zdCBzcGFuID0gaW5wdXQucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCB0aWNrSW5wdXQgPSAoX2EgPSBzcGFuLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCB0YXNrQ2xvc2UgPSAoKF9jID0gKF9iID0gc3Bhbi5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmxhc3RFbGVtZW50Q2hpbGQpO1xuICAgIGNvbnN0IGlkID0gTnVtYmVyKHNwYW4uY2xhc3NMaXN0WzBdKTtcbiAgICAvLyBhZGQgZW50ZXJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBpbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzcGFuLmlubmVyVGV4dCA9IGlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRhc2tDbG9zZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICB0aWNrSW5wdXQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgdG9kb3NbaWRdLnRhc2tWYWx1ZSA9IHNwYW4uaW5uZXJUZXh0O1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvLWxpc3RcIiwgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBpbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgdG9kb3Muc3BsaWNlKGlkLCAxKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kby1saXN0XCIsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG4gICAgICAgICAgICBzaG93VG9kbyhpZEZpbHRlcik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBhZGQgYmx1clxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lclRleHQgPSBpbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0YXNrQ2xvc2Uuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgdGlja0lucHV0LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgIHRvZG9zW2lkXS50YXNrVmFsdWUgPSBzcGFuLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvZG9zLnNwbGljZShpZCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvLWxpc3RcIiwgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgICAgICAgc2hvd1RvZG8oaWRGaWx0ZXIpO1xuICAgIH0pO1xufVxuY29uc29sZS5sb2codHlwZW9mIHRvZG9zKTtcbi8vIGNsZWFyIGFsbFxuZnVuY3Rpb24gY2xlYXJBbGxDb21wbGV0ZWQoKSB7XG4gICAgLy8gcmVtb3Zpbmcgc2VsZWN0ZWQgdGFza1xuICAgIGNvbnN0IHRvZG9zMiA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50YXNrU3RhdHVzICE9PSBcImNvbXBsZXRlZFwiKTtcbiAgICB0b2RvcyA9IHRvZG9zMjtcbiAgICBpZiAodG9kb3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlUYXNrSW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGNsZWFyQWxsLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG8tbGlzdFwiLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xuICAgIHNob3dUb2RvKGlkRmlsdGVyKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;