import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
        
    });
    getPosition();
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {});
  
    navigator.permissions.query({ name: 'push', userVisibleOnly:true }).then(() => {});
  }, []);


  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      },
      error => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
