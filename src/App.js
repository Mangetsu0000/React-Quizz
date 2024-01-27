import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { Main } from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Foooter from "./components/Foooter";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentQuestionIdx: 0,
  answer: null,
  score: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "decTime":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIdx);
      return {
        ...state,
        answer: action.payload,
        score:
          question.correctOption === action.payload
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIdx: state.currentQuestionIdx + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
        secondsRemaining: 10,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Invalid action");
  }
};

export default function App() {
  const [
    {
      status,
      questions,
      currentQuestionIdx,
      answer,
      score,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsNumber = questions.length;

  const maxScore = questions.reduce((prev, val) => prev + val.points, 0);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok)
          throw new Error("something went wrong while fetching data");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchQuestion();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNumber={questionsNumber} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              questionsNumber={questionsNumber}
              currentQuestionIdx={currentQuestionIdx}
              questions={questions}
              score={score}
              maxScore={maxScore}
            />
            <Question
              questionObj={questions[currentQuestionIdx]}
              dispatch={dispatch}
              answer={answer}
            />
            <Foooter>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestionIdx={currentQuestionIdx}
                questionsNumber={questionsNumber}
              />
            </Foooter>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            maxScore={maxScore}
            highscore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

// fetched data from real Api :)
// const [questionsObj, setQuestionsObj] = useState([]);
// useEffect(() => {
//   const fetchQuestions = async () => {
//     const res = await fetch("https://the-trivia-api.com/v2/questions");
//     const data = await res.json();
//     const questions = data.map((_questionObj) => ({
//       question: _questionObj.question.text,
//       options: [..._questionObj.incorrectAnswers, _questionObj.correctAnswer],
//       answer: _questionObj.correctAnswer,
//       id: _questionObj.id,
//     }));

//     setQuestionsObj(questions);
//   };
//   fetchQuestions();
// }, []);
// return (
//   <div className="app">
//     <Header />
//     <ul>
//       {questionsObj.map((_question, idx) => (
//         <>
//           <li key={_question.id}>
//             <p>
//               Question {idx + 1}: {_question.question}
//             </p>
//             <p>
//               Options:{" "}
//               {_question.options.map((_option, idx) => (
//                 <span>{`${idx + 1}: ${_option}. `}</span>
//               ))}
//             </p>
//             <p>Answer: {_question.answer}</p>
//           </li>
//         </>
//       ))}
//     </ul>
//   </div>
// );
