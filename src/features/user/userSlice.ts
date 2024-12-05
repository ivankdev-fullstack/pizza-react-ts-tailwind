import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  status: "idle" | "loading" | "error";
  address: string;
  error: string;
}

const initialState: UserState = {
  username: "",
  status: "idle",
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
