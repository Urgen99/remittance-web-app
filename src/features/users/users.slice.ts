import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  email: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

const selectCurrentEmail = (state: RootState) => state.users.email;

export const { setUserEmail } = userSlice.actions;

export { selectCurrentEmail };

export default userSlice.reducer;
