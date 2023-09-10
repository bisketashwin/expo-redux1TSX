import { configureStore } from "@reduxjs/toolkit";
import colorSlice, { ColorState } from "./colorSlice"; // Assuming you have a ColorState type defined in colorSlice.ts

export interface RootState {
  color: ColorState;
}

export const store = configureStore({
  reducer: {
    color: colorSlice, // Access the reducer property of colorSlice
  },
});

export type AppDispatch = typeof store.dispatch;
