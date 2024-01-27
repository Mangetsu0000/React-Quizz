import React from "react";

const StartScreen = ({ questionsNumber, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quizz</h2>
      <h3>{questionsNumber} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start!
      </button>
    </div>
  );
};

export default StartScreen;
