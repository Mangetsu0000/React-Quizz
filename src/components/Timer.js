import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "decTime" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
};

export default Timer;
