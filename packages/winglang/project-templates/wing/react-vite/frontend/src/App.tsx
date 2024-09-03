import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket from 'react-use-websocket';

const API_URL = window.wing.env.API_URL;
const WS_URL = window.wing.env.WS_URL;

function App() {
  const [count, setCount] = useState("0");
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counter`, {
      method: "POST"
    });
    setCount(await response.text()); 
  }
  const updateCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text());
  }

  useWebSocket(WS_URL, {
    onMessage: () => {
      updateCount();
    }
  });

  useEffect(() => {
    updateCount();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>{window.wing.env.TITLE}</h1>
      <div className="card">
        <button key={count} onClick={incrementCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
