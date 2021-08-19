import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    firstName: 'Jun',
    lastName: 'hork',
    grade: 7,
    age: 15,
    phone: '123-456-7890',
    family_id: 1
  },
  reducers: {
    chooseName: (state, action) => {
      state.firstName = action.payload;
      //payloads are form values... this changes the name in state to the form val
    },
    chooseAge: (state, action) => {
      state.age = action.payload;
    }
  }
});

export const reducer = rootSlice.reducer;
export const { chooseName, chooseAge } = rootSlice.actions;
