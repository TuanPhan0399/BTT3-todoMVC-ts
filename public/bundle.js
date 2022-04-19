/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
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

eval("\n// Selector\nconst taskInput = document.querySelector(\".task-input input\");\nconst taskBox = document.querySelector(\".task-box\");\n// getting localstorage todo-list\nlet todos = JSON.parse(localStorage.getItem(\"todo-list\") || \"[]\");\nlet taskInfo;\n// Event Listener\ntaskInput.addEventListener(\"keyup\", saveTask);\n//function\nfunction saveTask(e) {\n    // Do not take spaces and null characters\n    let userTask = taskInput.value.trim();\n    if (e.key === \"Enter\" && userTask) {\n        taskInput.value = \"\";\n        // Add one task new on todos\n        taskInfo = {\n            taskValue: userTask,\n            taskStatus: \"pending\",\n        };\n        todos.push(taskInfo);\n        localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n        showTodo();\n    }\n}\nfunction showTodo() {\n    let li = \"\";\n    todos.forEach((todo, id) => {\n        li += `<li class=\"task\">\n            <div>\n              <input onclick=\"updateStatus(this)\" type=\"checkbox\" id=\"${id}\">\n              <span ondblclick=\"editTask(this)\" class=\"${id}\">${todo.taskValue}</span>\n            </div>\n            <div class=\"task-close\">\n              <i onclick=\"deleteTask(${id})\" class=\"fa-solid fa-xmark\"></i>\n            </div>\n          </li>`;\n    });\n    taskBox.innerHTML = li;\n}\nshowTodo();\n\n\n//# sourceURL=webpack://webpack-typescript/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/
/******/ })()
;
