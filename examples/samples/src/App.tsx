import React from "react";
import { useVState } from "vcc-hooks";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount, { reset, getPrevState, getInitialState }] =
    useVState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount(count + 1)}>
            count is: {count}
          </button>
          <button type="button" onClick={() => alert(getPrevState())}>
            Show previous state
          </button>
          <button type="button" onClick={() => alert(getInitialState())}>
            Show initial state
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
