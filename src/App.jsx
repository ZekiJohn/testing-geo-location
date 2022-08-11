import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect, useRef  } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState("");
  const location = useRef();
  const status_message = useRef();

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
      if (result.state === 'granted') {
        getPosition();
        status_message.current.innerText = 'Access Granted! WELL DONE!';
      } else if (result.state === 'prompt') {
        status_message.current.innerText = 'Prompting User!';
        showButtonToEnableLocation();
      } else if (result.state === 'denied') {
        status_message.current.innerText = 'Please Give Access to Your Location.';
      }
    });
  }, []);


  const showButtonToEnableLocation = () => {
    navigator.permissions.query({ name: 'push', userVisibleOnly:true })
      .then(permissionStatus  => {});
  }

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition(position.coords.latitude + ',' + position.coords.longitude);
        location.current.innerText = position.coords.latitude + ', ' + position.coords.longitude + ' -- ' + position.coords.accuracy;
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
      <h5>
        <a ref={status_message} href={"http://maps.google.com/maps?q=" + position}></a>
      </h5>
      <h5>
        <a ref={location} href={"http://maps.google.com/maps?q=" + position}></a>
      </h5>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => getPosition()}>
          Give Location Access
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
