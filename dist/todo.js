"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// todo.ts
const readline = __importStar(require("readline"));
// 2. TodoManager class to encapsulate state and functionality
class TodoManager {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    sanitizeForLog(input) {
        return input.replace(/[\r\n\t]/g, ' ').substring(0, 100);
    }
    addTodo(title) {
        if (!title?.trim()) {
            console.log(" Title cannot be empty.");
            return;
        }
        const sanitizedTitle = title.trim();
        const newTodo = {
            id: this.nextId++,
            title: sanitizedTitle,
            completed: false,
        };
        this.todos.push(newTodo);
        console.log(`Added: "${this.sanitizeForLog(sanitizedTitle)}"`);
    }
    removeTodo(id) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("Invalid ID.");
            return;
        }
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            const removedTodo = this.todos[index];
            if (removedTodo) {
                this.todos.splice(index, 1);
                console.log(` Removed: "${this.sanitizeForLog(removedTodo.title)}"`);
            }
        }
        else {
            console.log("Todo not found.");
        }
    }
    editTodo(id, newTitle) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("Invalid ID.");
            return;
        }
        if (!newTitle?.trim()) {
            console.log(" New title cannot be empty.");
            return;
        }
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            const oldTitle = todo.title;
            const sanitizedNewTitle = newTitle.trim();
            todo.title = sanitizedNewTitle;
            console.log(` Edited "${this.sanitizeForLog(oldTitle)}" to "${this.sanitizeForLog(sanitizedNewTitle)}"`);
        }
        else {
            console.log("Todo not found.");
        }
    }
    toggleTodoStatus(id) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("Invalid ID.");
            return;
        }
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            console.log(`Toggled: "${this.sanitizeForLog(todo.title)}" -> ${todo.completed ? "Done" : "Not Done"}`);
        }
        else {
            console.log(" Todo not found.");
        }
    }
    displayTodos() {
        console.log("\n Your Todo List:");
        if (this.todos.length === 0) {
            console.log("No tasks found!");
            return;
        }
        this.todos.forEach((todo) => {
            console.log(`${todo.id}. ${this.sanitizeForLog(todo.title)} [${todo.completed ? "done" : "not done"}]`);
        });
    }
    getTodos() {
        return this.todos;
    }
}
// Interactive CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const todoManager = new TodoManager();
function showMenu() {
    console.log("\n Todo App Menu:");
    console.log("1. Add task");
    console.log("2. View tasks");
    console.log("3. Edit task");
    console.log("4. Toggle task status");
    console.log("5. Remove task");
    console.log("6. Exit");
}
function handleUserInput() {
    showMenu();
    rl.question("\nChoose an option (1-6): ", (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question("Enter task title: ", (title) => {
                    todoManager.addTodo(title);
                    handleUserInput();
                });
                break;
            case '2':
                todoManager.displayTodos();
                handleUserInput();
                break;
            case '3':
                todoManager.displayTodos();
                rl.question("Enter task ID to edit: ", (idStr) => {
                    const id = parseInt(idStr);
                    rl.question("Enter new title: ", (newTitle) => {
                        todoManager.editTodo(id, newTitle);
                        handleUserInput();
                    });
                });
                break;
            case '4':
                todoManager.displayTodos();
                rl.question("Enter task ID to toggle: ", (idStr) => {
                    const id = parseInt(idStr);
                    todoManager.toggleTodoStatus(id);
                    handleUserInput();
                });
                break;
            case '5':
                todoManager.displayTodos();
                rl.question("Enter task ID to remove: ", (idStr) => {
                    const id = parseInt(idStr);
                    todoManager.removeTodo(id);
                    handleUserInput();
                });
                break;
            case '6':
                console.log("\n Goodbye! have a great time");
                rl.close();
                break;
            default:
                console.log(" Invalid option. Please choose 1-6.");
                handleUserInput();
                break;
        }
    });
}
// Start the app
console.log("Welcome to Todo App!!");
handleUserInput();
//# sourceMappingURL=todo.js.map