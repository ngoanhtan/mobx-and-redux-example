import { TodoType } from "./Types";

class TodoStore {
  todos: Array<TodoType> = [];

  get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length;
  }

  report() {
    if (this.todos.length === 0) return "<none>";
    return (
      `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task: string) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

const todoStore = new TodoStore();
