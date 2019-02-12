import React, { useState, useContext } from "react";
import { render } from "react-dom";
import Task, { myTasks } from "./task";
import useLocalStorageReducer from "./useLocalStorage";
import randomcolor from "randomcolor";

import "./styles.css";

enum TaskActionType {
  ADD,
  REMOVE
}

type TaskAction = TaskAddAction | TaskRemoveAction;

interface TaskAddAction {
  type: TaskActionType.ADD;
  task: Task;
}

interface TaskRemoveAction {
  type: TaskActionType.REMOVE;
  id: number;
}

function tasksReducer(state: Task[], action: TaskAction) {
  switch (action.type) {
    case TaskActionType.ADD:
      return [action.task, ...state];
    case TaskActionType.REMOVE:
      return state.filter(t => t.id != action.id);
  }
}

function App() {
  const [tasks, dispatch] = useLocalStorageReducer("tasks", tasksReducer, []);

  return (
    <div className="App">
      {/*<h2 className="App__title">Tastack</h2>*/}

      <TaskForm
        onAddTask={task =>
          dispatch({
            type: TaskActionType.ADD,
            task: {
              id: Math.random(),
              title: task
            }
          })
        }
      />
      {tasks.map((task: Task) => (
        <TaskBlock key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}

// const Blocks = ({ children }) => <div className="Blocsadfks">{children}</div>;

const Block: React.FunctionComponent<{
  id: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  dispatch: React.Dispatch<Task[]>;
}> = ({ id, title, description, children, dispatch }) => {
  const [color] = React.useState(() =>
    randomcolor({
      luminosity: "bright",
      // hue: 80,
      format: "hsl"
    })
  );
  return (
    <div className="Block" style={{ borderColor: color }}>
      <div className="Block__header">
        {title && <h4 className="Block__title">{title}</h4>}
        <BlockActions dispatch={dispatch} id={id} />
      </div>
      {description && <p className="Block__description">{description}</p>}
      {children}
    </div>
  );
};

const BlockActions = ({ dispatch, id }) => (
  <aside className="BlockActions">
    <button onClick={() => dispatch({ type: TaskActionType.REMOVE, id })}>
      Done
    </button>
  </aside>
);

function TaskBlock({ task, dispatch }) {
  return (
    <Block
      id={task.id}
      title={task.title}
      description={task.description}
      dispatch={dispatch}
    >
      {task.tasks && task.tasks.map(task => <TaskBlock {...task} />)}
    </Block>
  );
}

const TaskForm = ({ onAddTask }) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="TaskForm"
      onSubmit={e => {
        e.preventDefault();
        onAddTask(value);
        setValue("");
      }}
    >
      <input
        placeholder="Write task title..."
        className="TaskForm__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        // autoFocus
      />
      <button type="submit" className="TaskForm__button" disabled={!value}>
        Add
      </button>
    </form>
  );
};

const Logo = () => (
  <svg
    width="100"
    height="70"
    className="Logo"
    style={{ zIndex: -1, opacity: 0.04 }}
  >
    <rect width="100" height="8" />
    <rect y="10" width="100" height="8" />
    <rect y="20" width="100" height="8" />
    <rect y="30" width="100" height="8" />
    <rect y="40" width="100" height="8" />
    <rect y="50" width="100" height="8" />
    <rect y="60" width="100" height="8" />
    <rect y="70" width="100" height="8" />
  </svg>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
