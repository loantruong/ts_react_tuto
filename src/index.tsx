import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

type FormElem = React.FormEvent<HTMLFormElement>; // ref to an another element existe

interface IToDo {
  text: string;
  complete: boolean;
} // on créer un nouvel element

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<IToDo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: IToDo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: IToDo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: IToDo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add todo</button>
      </form>
      <section>
        {todos.map((todo: IToDo, index: number) => (
          <Fragment key={index}>
            <p style={{ textDecoration: todo.complete ? "line-through" : "" }}>
              {todo.text}
            </p>
            <button type="button" onClick={() => completeTodo(index)}>
              {todo.complete ? "Incomplete" : "Complete"}
            </button>
            <button type="button" onClick={() => removeTodo(index)}>
              remove
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
