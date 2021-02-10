import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Successfully Loads Audio File</p>
        <audio controls src="http://localhost:3333/static/song.wav"></audio>
      </header>
    </div>
  );
}

export default App;
