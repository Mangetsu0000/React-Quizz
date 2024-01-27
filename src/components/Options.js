import React from "react";

const Options = ({ questionObj, dispatch, answer }) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questionObj?.options.map((_option, _optionIdx) => (
        <button
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: _optionIdx })}
          key={_option}
          className={`btn btn-option ${_optionIdx === answer ? "answer" : ""} ${
            hasAnswered
              ? _optionIdx === questionObj.correctOption
                ? "correct"
                : "wrong"
              : "btn btn-option"
          }`}
        >
          {_option}
        </button>
      ))}
    </div>
  );
};

export default Options;
