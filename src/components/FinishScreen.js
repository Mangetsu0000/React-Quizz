const FinishScreen = ({ score, maxScore, highscore, dispatch }) => {
  const correctRate = (score / maxScore) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxScore}.{" "}
        {Math.ceil(correctRate)}% of the questions were answered correctly.
      </p>
      <p className="highscore">You highscore is: {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quizz
      </button>
    </>
  );
};

export default FinishScreen;
