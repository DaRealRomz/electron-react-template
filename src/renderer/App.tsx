import { useState } from "react";
import reactIcon from "./react.svg";
import classes from "./App.module.css";
import "./global.css";

export default function App() {
  const [pong, setPong] = useState("");
  return (
    <main>
      <div className={classes.container}>
        <div>
          <h1>Electron React Template</h1>
          This app is using:
          <ul>
            <li>Chrome {window.electron.versions.chrome()}</li>
            <li>Node.js {window.electron.versions.node()}</li>
            <li>Electron {window.electron.versions.electron()}</li>
          </ul>
        </div>
        <img className={classes.reactLogo} src={reactIcon} alt="React Icon" />
      </div>
      <hr />
      <h3>Inter-Process Communication</h3>
      <button className={classes.pingButton} type="button" onClick={() => window.electron.ping().then(setPong)}>
        Ping main process
      </button>
      {pong}
    </main>
  );
}
