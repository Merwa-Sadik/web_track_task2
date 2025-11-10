// todo.ts
// 2. TodoManager class to encapsulate state and functionality
var TodoManager = /** @class */ (function () {
    function TodoManager() {
        this.todos = [];
        this.nextId = 1;
    }
    TodoManager.prototype.sanitizeForLog = function (input) {
        return input.replace(/[\r\n\t]/g, ' ').substring(0, 100);
    };
    TodoManager.prototype.addTodo = function (title) {
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            console.log("⚠️ Title cannot be empty.");
            return;
        }
        var sanitizedTitle = title.trim();
        var newTodo = {
            id: this.nextId++,
            title: sanitizedTitle,
            completed: false,
        };
        this.todos.push(newTodo);
        console.log("\u2705 Added: \"".concat(this.sanitizeForLog(sanitizedTitle), "\""));
    };
    TodoManager.prototype.removeTodo = function (id) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("⚠️ Invalid ID.");
            return;
        }
        var index = this.todos.findIndex(function (todo) { return todo.id === id; });
        if (index !== -1) {
            var removedTodo = this.todos[index];
            if (removedTodo) {
                this.todos.splice(index, 1);
                console.log("\uD83D\uDDD1\uFE0F Removed: \"".concat(this.sanitizeForLog(removedTodo.title), "\""));
            }
        }
        else {
            console.log("⚠️ Todo not found.");
        }
    };
    TodoManager.prototype.editTodo = function (id, newTitle) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("⚠️ Invalid ID.");
            return;
        }
        if (!(newTitle === null || newTitle === void 0 ? void 0 : newTitle.trim())) {
            console.log("⚠️ New title cannot be empty.");
            return;
        }
        var todo = this.todos.find(function (t) { return t.id === id; });
        if (todo) {
            var oldTitle = todo.title;
            var sanitizedNewTitle = newTitle.trim();
            todo.title = sanitizedNewTitle;
            console.log("\u270F\uFE0F Edited \"".concat(this.sanitizeForLog(oldTitle), "\" to \"").concat(this.sanitizeForLog(sanitizedNewTitle), "\""));
        }
        else {
            console.log("⚠️ Todo not found.");
        }
    };
    TodoManager.prototype.toggleTodoStatus = function (id) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log("⚠️ Invalid ID.");
            return;
        }
        var todo = this.todos.find(function (t) { return t.id === id; });
        if (todo) {
            todo.completed = !todo.completed;
            console.log("\uD83D\uDD01 Toggled: \"".concat(this.sanitizeForLog(todo.title), "\" -> ").concat(todo.completed ? "Done" : "Not Done"));
        }
        else {
            console.log("⚠️ Todo not found.");
        }
    };
    TodoManager.prototype.displayTodos = function () {
        var _this = this;
        console.log("\n📝 Your Todo List:");
        if (this.todos.length === 0) {
            console.log("No tasks found!");
            return;
        }
        this.todos.forEach(function (todo) {
            console.log("".concat(todo.id, ". ").concat(_this.sanitizeForLog(todo.title), " [").concat(todo.completed ? "✅" : "❌", "]"));
        });
    };
    return TodoManager;
}());
// Example usage (for testing)
var todoManager = new TodoManager();
todoManager.addTodo("Finish TypeScript assignment");
todoManager.addTodo("Upload to GitHub");
todoManager.displayTodos();
todoManager.editTodo(1, "Finish TypeScript Todo app");
todoManager.toggleTodoStatus(2);
todoManager.removeTodo(1);
todoManager.displayTodos();
