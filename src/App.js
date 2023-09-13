import React, { useState, useEffect } from 'react';

function App() {
  const [countdown, setCountdown] = useState(0);
  const [label, setLabel] = useState('');
  const [activityLog, setActivityLog] = useState([]);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [sessionSummary, setSessionSummary] = useState(null);

  const startCountdown = () => {
    if (countdown > 0 && label !== '') {
      const startTime = new Date();
      const newActivity = {
        label,
        startTime,
        endTime: null,
      };
      setActivityLog([...activityLog, newActivity]);
      setIsCountdownActive(true);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        newActivity.endTime = new Date();
        setCountdown(0);
        setIsCountdownActive(false);
      }, countdown * 1000);

      // Clear the task label for the next task
      setLabel('');
    }
  };

  const endSession = () => {
    setIsCountdownActive(false);
    const sessionEndTime = new Date();
    setSessionSummary({
      sessionStartTime: activityLog[0].startTime,
      sessionEndTime,
      totalTasks: activityLog.length,
    });
  };

  return (
    <div>
      <h1>TimeTrack Pro</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          disabled={isCountdownActive}
        />
        <input
          type="number"
          placeholder="Enter countdown in seconds"
          value={countdown}
          onChange={(e) => setCountdown(e.target.value)}
          disabled={isCountdownActive}
        />
        {isCountdownActive ? (
          <>
            <button onClick={startCountdown}>Next</button>
            <button onClick={endSession}>End</button>
          </>
        ) : (
          <button onClick={startCountdown}>Start</button>
        )}
      </div>
      <div>
        <h2>Activity Log</h2>
        <ul>
          {activityLog.map((activity, index) => (
            <li key={index}>
              Task: {activity.label} | Start Time: {activity.startTime.toLocaleTimeString()} | End Time:{' '}
              {activity.endTime ? activity.endTime.toLocaleTimeString() : 'In progress'}
            </li>
          ))}
        </ul>
      </div>
      {sessionSummary && (
        <div>
          <h2>Summary</h2>
          <p>Session started at: {sessionSummary.sessionStartTime.toLocaleTimeString()}</p>
          <p>Session ended at: {sessionSummary.sessionEndTime.toLocaleTimeString()}</p>
          <p>Total tasks completed: {sessionSummary.totalTasks}</p>
        </div>
      )}
    </div>
  );
}

export default App;
