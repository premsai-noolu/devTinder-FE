import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
