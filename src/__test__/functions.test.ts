/**
 *  @jest-environment jsdom
 */

import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = "";
  });

test("should add new todo correctly", () => {
    //arrange
    let newTodos: Todo[] = [];
    let todoTxt = "Hello world";
    let length = newTodos.length;

    //act

    functions.addTodo(todoTxt, newTodos);

    //assert
    expect(newTodos.length).toBe(length + 1);
    expect(todoTxt).toBe("Hello world");
});

test("should not add new todo", () => {
    //arrange
    let newTodos: Todo[] = [];
    let todoTxt = "";

    //act

    functions.addTodo(todoTxt, newTodos);

    //assert
    expect(newTodos.length).toBe(0);
    expect(todoTxt).toBe("");
});

test("should change todo correctly", () => {
    //arrange
    let todo: Todo = { text: 'Dinner with friends', done: false };

    //act
	functions.changeTodo(todo);

    //assert
	expect(todo.done).toBe(true);

});

test("should remove all todos correctly", () => {
    //arrange
    let newTodos: Todo[] = [
      { text: 'item 1', done: false },
      { text: 'item 2', done: false },
      { text: 'item 3', done: true }
    ];

    //act
    functions.removeAllTodos(newTodos);

    //assert
    expect(newTodos.length).toBe(0);

  });

test("should sort todos correctly", () => {
  //arrange 
  let newTodos: Todo[] = [
    { text: 'ko', done: false },
    { text: 'apa', done: false },
    { text: 'citron', done: false }
  ];

  //act 
  functions.sortByName(newTodos);

  //assert 
  let result = [
    { text: 'apa', done: false },
    { text: 'citron', done: false },
    { text: 'ko', done: false }
  ];
  expect(newTodos).toStrictEqual(result);
});
