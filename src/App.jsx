import React, { useEffect } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { typeActions } from "./store/typeTest";

let randomNum = Math.floor(Math.random() * 9);
const texts = [
  "Take a deep breath, relax your fingers, and take it slow",
  "You need to be focused and not annoyed when attempting the typing speed test",
  "The best thing you can do to start typing faster is to type more. The more practice you get under your belt, the faster your `typing-fu` will be",
  "It`s all about developing muscle memory. Just make sure you are reinforcing good habits and not ones that will leave your fingers hurting after an intense typing session",
  "Of course, you should use ten fingers for typing, but you can start with a layout that’s the most comfortable for you",
  "The small bumps on the F and J keys will help your fingers locate the correct position without looking",
  "This setup should give you a full range of motion. The more you type, the faster you will get",
  "There are a few alternative layouts that propose a more ergonomic approach to typing",
  "You could also take the big leap and try out the Dvorak keyboard, but that’s a different story",
  "The QWERTY keyboard was invented in 1868 by Christopher Latham Sholes. He also designed the first successful typewriter",
];
const App = () => {
  const currentTime = useSelector((state) => state.currentTime);
  const isRunningTimer = useSelector((state) => state.isRunningTimer);
  const isDisabled = useSelector((state) => state.isDisabled);
  const isFinished = useSelector((state) => state.isFinished);
  const isStopped = useSelector((state) => state.isStopped);
  const isRight = useSelector((state) => state.isRight);
  const randomText = useSelector((state) => state.randomText);
  const inputText = useSelector((state) => state.inputText);
  const resultText = useSelector((state) => state.resultText);
  let mistakes = useSelector((state) => state.mistakes);

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;
    if (isRunningTimer) {
      intervalId = setInterval(() => {
        dispatch(typeActions.incrementTimer());
      }, 1000);
    }

    if (currentTime === 0) {
      clearInterval(intervalId);
      dispatch(typeActions.timerStopsTest());
      dispatch(typeActions.offTextArea());
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunningTimer, currentTime, dispatch]);

  useEffect(() => {
    let randomChar = texts[randomNum];
    let text = "";
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === randomChar[i]) {
        text += inputText[i];
        dispatch(typeActions.setGreenColor());
      } else {
        dispatch(typeActions.setRedColor());
        dispatch(typeActions.incrementMistakes());
      }
    }
    
  }, [dispatch, inputText]);

  // useEffect(() => {
  //   for (let i = 0; i < inputText.length; i++) {
  //     if (inputText[i] === randomText[i]) {
  //       dispatch(typeActions.setGreenColor());
  //     }
  //   }
  // }, [dispatch, inputText, randomText]);

  const startTest = () => {
    dispatch(typeActions.startTimer());
  };
  const stopTest = () => {
    dispatch(typeActions.stopTimer());

  };

  const getText = (text) => {
    dispatch(typeActions.getInputText(text));
    let randomChar = texts[randomNum];
    for (let i = 0; i < randomChar.length; i++) {
      if (text[i] === randomChar[i]) {
        dispatch(typeActions.setGreenColor());
      } else {
        dispatch(typeActions.setRedColor());
        dispatch(typeActions.incrementMistakes());
      }
    }
  };
  return (
    <div className="main-container">
      <h3 className="title">Check Your Typing Speed in 30 Seconds</h3>
      <div className="info-container">
        <p>Time: {currentTime}s</p>
        <p>Mistakes: {mistakes}</p>
      </div>
      <div className="text-test-container">
        {texts[randomNum].split("").map((char, index) => (
          <span
            key={index}
            className={`text-test ${isRight ? "isRight" : "isWrong"}`}
          >
            {char}
          </span>
        ))}
      </div>
      {/* <p className="text-test">{texts[randomNum]}</p> */}
      <div className="input-container">
        <textarea
          name="input"
          id="input"
          className={`textarea ${isRunningTimer && "active"}`}
          placeholder="Type here when test starts..."
          onChange={(e) => getText(e.target.value)}
          disabled={isDisabled}
        ></textarea>
        {isFinished || isStopped ? (
          <div className="isFinished">
            <p>{resultText || "The Test has been finished"}</p>
          </div>
        ) : (
          <div className="btn-container">
            {isRunningTimer ? (
              <button className="stopTestBtn" onClick={stopTest}>
                Stop Test
              </button>
            ) : (
              <button onClick={startTest} className="startTestBtn">
                Start Test
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
