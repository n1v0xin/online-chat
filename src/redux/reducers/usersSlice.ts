import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../types";

const initialState: UsersState = {
  loading: true,
  list: [],
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
  },
});

export const { loadUsers } = usersSlice.actions;

export default usersSlice.reducer;
