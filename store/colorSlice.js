
////https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

import { createSlice } from "@reduxjs/toolkit";
import ColorNameConverter from "../plugIns/ColorNameConverter";

const initialState = {
  value: [],
};




const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // const color = `rgb(${red}, ${green}, ${blue})`
  const hexColor = `#${redHex}${greenHex}${blueHex}`
  return (hexColor);
};

const generateColorName = (hexColor) => {
  const inputColor = inputColor?? randomColor()
  // this give us "#ACDD4D"
  const colorName = ColorNameConverter(inputColor)
  //this gives us ["#ACDD4D", "Conifer", false]
  return (
    colorName
  )
}

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state) => {
      state.value = [...state.value, generateColorName()];
    },
    editColor: (state, action) => {
      const [oldColor, newHexColor] = action.payload;
      console.log(oldColor, newHexColor); // ["#F653A6", "Brilliant Rose", false] #8ae7d7
      const newColor = generateColorName(newHexColor); // Use newHexColor to generate the new color
      console.log(newColor); // ["#8B00FF", "Electric Violet", false]
    
      //  const index = state.value.indexOf(oldColor);
      // if (index !== -1) {
      //   state.value[index] = newColor;
      // }
      // Find the index of the old color in state.value
      const index = state.value.findIndex((color) => color[0] === oldColor[0]);
    
      if (index !== -1) {
        // Create a new array with the updated color at the specified index
        const updatedValue = [...state.value]; // create a copy of array
        updatedValue[index] = newColor; // change the in the copy
        state.value = updatedValue; // assing new copy to old
      }
    },
    deleteColor: (state, action) => {
      const colorToDelete = action.payload;

      const index = state.value.findIndex((color) => color[0] === colorToDelete[0]);

      if (index !== -1) {
        ///If the index to delete is found (not equal to -1), we create a new array called updatedValue using the filter method. This new array contains all the colors except the one to be deleted. We use the index !== indexToDelete condition in the filter callback to exclude the color at the specified index.
        updatedValue = state.value.filter((color, index) => color[0] !==colorToDelete[0] ); // delete in the copy // working but not effcient
        state.value = updatedValue; // assing new copy to old

      //state.value = state.value.filter((color) => color !== colorToDelete);// only color logic now its an array of info
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setColor, editColor, deleteColor } = colorSlice.actions;

export default colorSlice.reducer;
