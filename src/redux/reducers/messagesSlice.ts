import { createSlice } from "@reduxjs/toolkit";
import { MessagesState } from "../types";

const initialState: MessagesState = {
  loading: true,
  list: [],
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadMessages(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
