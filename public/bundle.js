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

eval("\n// Selector\nconst taskInput = document.querySelector(\".task-input input\");\n// getting localstorage todo-list\nlet todos = JSON.parse(localStorage.getItem(\"todo-list\") || \"[]\");\nlet taskInfo;\ntaskInput.addEventListener(\"keyup\", (e) => {\n    let userTask = taskInput.value.trim();\n    if (e.key === \"Enter\" && userTask) {\n        console.log(userTask);\n        taskInput.value = \"\";\n        taskInfo = {\n            taskValue: userTask,\n            taskStatus: \"pending\",\n        };\n        todos.push(taskInfo);\n        localStorage.setItem(\"todo-list\", JSON.stringify(todos));\n    }\n});\n\n\n//# sourceURL=webpack://webpack-typescript/./src/index.ts?");

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