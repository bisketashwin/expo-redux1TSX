
////https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findColorName, generateColorName } from "../plugIns/colorNameFinder";

export interface ColorState {
  value: Array<[string, string, boolean]>;
}

const initialState: ColorState = {
  value: [],
};


const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state) => {
      state.value.push(generateColorName());
    },
    editColor: (state, action: PayloadAction<[[string, string, boolean], [string, string, boolean]]>) => {
      const [oldColor, newColor] = action.payload;
  

      const index = state.value.findIndex((color) => color[0] === oldColor[0]);

      if (index !== -1) {
        const updatedValue = [...state.value];
        updatedValue[index] = newColor;
        state.value = updatedValue;
      }
    },
    deleteColor: (state, action: PayloadAction<[string, string, boolean]>) => {
      const [hexCodeToDelete] = action.payload;

      const updatedValue = state.value.filter((color) => color[0] !== hexCodeToDelete);
      state.value = updatedValue;
    },
  },
});

export const { setColor, editColor, deleteColor } = colorSlice.actions;

export default colorSlice.reducer;
