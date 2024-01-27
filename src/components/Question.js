import React from "react";
import Options from "./Options";

const Question = ({ questionObj, dispatch, answer }) => {
  return (
    <>
      <h4>{questionObj?.question}</h4>
      <Options questionObj={questionObj} dispatch={dispatch} answer={answer} />
    </>
  );
};

export default Question;
