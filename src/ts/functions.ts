import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";
import { createHtml } from "./main";

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "" };
  } else {
    return { success: false, error: "Du måste ange minst tre bokstäver" };
  }
}

export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

export function sortByName(todos: Todo[]) {
  todos.sort((todos1, todos2) => {
    if (todos1.text.toLowerCase() < todos2.text.toLowerCase()) {
      return -1;
    }
    if (todos1.text.toLowerCase() > todos2.text.toLowerCase()) {
      return 1;
    }
    return 0;
  });
}
