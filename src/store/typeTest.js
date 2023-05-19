import { createSlice } from "@reduxjs/toolkit";

const typeTest = {
  currentTime: 30,
  isRunningTimer: false,
  isDisabled: true,
  isFinished: false,
  isStopped: false,
  texts: [
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
  ],
  randomText: "",
  inputText: "",
  resultText: "",
  mistakes: 0,
  isRight: false
};

const typeTestSlice = createSlice({
  name: "typeTest",
  initialState: typeTest,
  reducers: {
    startTimer(state) {
      state.isRunningTimer = true;
      state.isDisabled = false;
    },
    stopTimer(state) {
      state.isRunningTimer = false;
      state.isDisabled = true;
      state.isFinished = true;
    //   if (state.randomText === state.inputText) {
    //     state.resultText = "Right";
    //   } else {
    //     state.resultText = "Wrong";
    //   }
    //   let textChar = state.inputText.split("");
    },
    incrementTimer(state) {
      state.currentTime -= 1;
    },
    randomText(state) {
      let randomNum = Math.floor(Math.random() * 9);
      state.randomText = state.texts[randomNum].split('');
    },
    getInputText(state, action) {
      state.inputText = action.payload.split('');
    //   for(let i = 0; i < state.randomText.length; i++) {
    //     if (state.inputText[i] !== state.randomText[i]) {
    //         break
    //     } else {
    //         state.setGreenColor = true
    //     }
    //   }
    //   console.log(state.inputText);
    },
    timerStopsTest(state) {
      state.isStopped = true;
    },
    incrementMistakes(state) {
      state.mistakes++;
    },
    setGreenColor(state) {
        state.isRight = true
    },
    setRedColor(state) {
        state.isRight = false
    },
    offTextArea(state) {
     state.isDisabled = true
    }
  },
});

export const typeActions = typeTestSlice.actions;
export default typeTestSlice.reducer;
