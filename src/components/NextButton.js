const NextButton = ({
  dispatch,
  answer,
  currentQuestionIdx,
  questionsNumber,
}) => {
  if (answer === null) return null;
  if (currentQuestionIdx < questionsNumber - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (currentQuestionIdx === questionsNumber - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
  }
};
export default NextButton;
