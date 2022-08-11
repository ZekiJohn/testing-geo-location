import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect, useRef  } from 'react'

function App() {
  const [accuracy, setAccuracy] = useState("");
  const [status_message, setStatusMessage] = useState("");
  const [user_location, setUserLocation] = useState("");


  const promptUserLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
      if (result.state === 'granted') {
        getPosition();
      } else if (result.state === 'prompt') {
        showEnableLocation();
      }
    });
  }

  const showEnableLocation = () => {
    navigator.permissions.query({ name: 'push', userVisibleOnly:true })
      .then(permissionStatus  => {
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'denied') {
            setStatusMessage('Please Give Access to Your Location.');
          } else if (permissionStatus.state === 'granted') {
            setStatusMessage('Access Granted! WELL DONE!');
          } else if (result.state === 'denied') {
            setStatusMessage('Status PROMPT!');
          }
        }
      });
  }

  const getPosition = () => {
    promptUserLocation();
    navigator.geolocation.getCurrentPosition(
      position => {
        setAccuracy(' -- ' + position.coords.accuracy);
        setUserLocation(position.coords.latitude + ', ' + position.coords.longitude);
      },
      error => {
        alert("Error : " + error.code + " - " + error.message);
      },
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
      <h3>{status_message}</h3>
      <h5>
        <a href={"http://maps.google.com/maps?q=" + user_location}>
          {user_location} {accuracy}
        </a>
      </h5>
      <div className="card">
        <button onClick={() => getPosition()}>
          Show Location
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
