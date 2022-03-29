import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const [expiryTime, setExpiryTime] = useState(null);
  const dateTimeRef = useRef(null);
  const expTimeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      dateTimeRef.current.innerText = `Current time is ${moment().format(
        "hh : mm : ss"
      )}`;
      const timeRemaining = moment.duration(expiryTime - moment.now());
      expTimeRef.current.innerText = expiryTime
        ? `${timeRemaining.hours()} Hours ${timeRemaining.minutes()} Minutes ${timeRemaining.seconds()} Seconds`
        : null;
    }, 1000);
    return () => clearInterval(interval);
  });

  const btnClick = () => {
    if (expiryTime) {
      expiryTime.add(10, "minutes");
    } else {
      setExpiryTime(moment().add(10, "minutes"));
    }
  };

  return (
    <div className='App'>
      <span ref={dateTimeRef} />
      <br />
      <span ref={expTimeRef} />
      <br />
      <button onClick={btnClick}>Add Time</button>
    </div>
  );
}

export default App;
