/**
 *  @jest-environment jsdom
 */

import * as functions from "../ts/functions";
import * as main from "../ts/main";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("should create new todo", () => {
  //arrange
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

  const todos: Todo[] = [];
  const todoTxt = "Hello world";

  //act
  main.createNewTodo(todoTxt, todos);

  //assert
  expect(document.querySelector(".todo__text")?.innerHTML).toEqual(
    `${todoTxt}`
  );
});

test("should not create new todo", () => {
  //arrange
  document.body.innerHTML = `<div id="error"></div>`;

  const todos: Todo[] = [];
  const todoTxt = "a";

  //act
  main.createNewTodo(todoTxt, todos);

  //assert
  expect(document.querySelector("#error")?.innerHTML).toEqual(
    `Du måste ange minst tre bokstäver`
  );
});


test("should add class when todo is done", () => {
  //arrange
  document.body.innerHTML = `<ul id="todos" class="todo"><li class="todo__text">
  </li></ul>`;

  const todos: Todo[] = [
		{ text: 'Its firday', done: true },
	];

  //act
  main.createHtml(todos);

  //assert
  let result = document.querySelector(".todo__text") as HTMLDivElement;
  expect(result.classList.contains("todo__text--done")).toBe(true);
});

test("should call function clearTodos correctly", () => {
  //arrange
  let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

  //act
  main.clearTodos([]);

  //assert
  expect(spyOnCreateHtml).toHaveBeenCalled();
  spyOnCreateHtml.mockRestore();
});

test("should call function removeAllTodos correctly", () => {
  //arrange
  document.body.innerHTML = `<ul id="todos" class="todo"><li class="todo__text">rida</li>
  <li class="todo__text">hoppa</li><li class="todo__text">handla</li></ul>`

  let spyOnRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();

  //act
  main.clearTodos([]);

  //assert
  expect(spyOnRemoveAllTodos).toHaveBeenCalled();
  expect(spyOnRemoveAllTodos).toHaveBeenCalledTimes(1);
  spyOnRemoveAllTodos.mockRestore();
});

test("should call function createHtml correctly", () => {
  //arrange
  let todos: Todo[] = [];
  let todo2 = { text: "todo", done: false };
  let spyOnCreateHtml = jest
    .spyOn(main, "createHtml").mockReturnValue();

  //act
  main.clearTodos(todos);
  main.toggleTodo(todo2)

  //assert
  expect(spyOnCreateHtml).toHaveBeenCalled();
  expect(spyOnCreateHtml).toHaveBeenCalledTimes(2);
  spyOnCreateHtml.mockRestore();
});

test("should call changeTodo", () => {
  let todo = { text: "todo", done: false };

  let spyOnChangeTodo = jest.spyOn(functions, "changeTodo").mockReturnValue();

  functions.changeTodo(todo);

  expect(spyOnChangeTodo).toHaveBeenCalled();
  expect(spyOnChangeTodo).toHaveBeenCalledTimes(1);
  spyOnChangeTodo.mockRestore();
});

test("should call toggleTodo correctly", () => {
  //arrange
  let todo = { text: "todo", done: false };
  let spyOnToggleTodo = jest.spyOn(main, "toggleTodo").mockReturnValue();  

  //act
  main.toggleTodo(todo);

  //assert
  expect(spyOnToggleTodo).toHaveBeenCalled();
  spyOnToggleTodo.mockRestore();
});

test("get todos from localStorage correctly", () => {
  //arrange
  localStorage.setItem("todos", JSON.stringify([{ text: 'todo 1', completed: false }, 
  { text: 'todo 2', completed: true }]));

  //act
  let todos = JSON.parse(localStorage.getItem("todos") || "[]");
  let length = todos.length

  //assert
  expect(todos).toEqual([{ text: 'todo 1', completed: false }, { text: 'todo 2', completed: true }]);
  expect(length).toBe(2);
}); 

test("should call on toggleTodo on click", () => {
  //arrange 
  document.body.innerHTML = `<ul id="todos" class="todo"><li class="todo__text">
  </li></ul>`;

  const todos: Todo[] = [
		{ text: 'Go to bed', done: true },
	];

  let spyOnToggleTodo = jest.spyOn(main, "toggleTodo").mockReturnValue();
  main.createHtml(todos);
 

  //act 
  document.querySelector("li")?.click();

  //assert
  expect(spyOnToggleTodo).toHaveBeenCalled();
  spyOnToggleTodo.mockRestore();
});

test("should display error", () => {
  //arrange
  let errorTxt = "Error";
  document.body.innerHTML = `<div id="error" class="error"></div>`;

  //act
  main.displayError(errorTxt, true);

  //assert
  let result = document.getElementById("error") as HTMLDivElement;
  expect(result.classList.contains("show")).toBe(true);
});

test("should not display error", () => {
  //arrange
  let errorTxt = "Error";
  document.body.innerHTML = `<div id="error" class="error"></div>`;

  //act
  main.displayError(errorTxt, false);

  //assert
  let result = document.getElementById("error") as HTMLDivElement;
  expect(result.classList.contains("show")).toBe(false);
});

