import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (time > 0) {
      setLaps([...laps, formatTime(time)]);
    }
  };

  return (
    <div className="app">
      <div className="stopwatch-card">
        <h1>⏱ Stopwatch</h1>

        <div className="time-display">
          {formatTime(time)}
        </div>

        <div className="button-group">
          <button
            className="btn start"
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            className="btn lap"
            onClick={handleLap}
            disabled={!isRunning}
          >
            Lap
          </button>

          <button
            className="btn reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="laps-container">
            <h2>Lap Times</h2>

            <ul>
              {laps
                .slice()
                .reverse()
                .map((lap, index) => (
                  <li key={index}>
                    <span>Lap {laps.length - index}</span>
                    <span>{lap}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;