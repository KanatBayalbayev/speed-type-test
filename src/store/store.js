import { configureStore } from "@reduxjs/toolkit";
import typeTest from "./typeTest";

const store = configureStore({
  reducer: typeTest,
});

export default store;
