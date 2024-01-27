const ProgressBar = ({
  currentQuestionIdx,
  questionsNumber,
  score,
  maxScore,
}) => {
  return (
    <header className="progress">
      <progress max={maxScore} value={score} />
      <p>
        Question <strong>{currentQuestionIdx + 1}</strong> /{questionsNumber}
      </p>
      <p>
        <strong>{score}</strong>/{maxScore}
      </p>
    </header>
  );
};

export default ProgressBar;
