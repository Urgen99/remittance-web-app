import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UserInitialState = {
  email?: string | null;
  id: string | number | null;
};

const initialState: UserInitialState = {
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<UserInitialState>) => {
      const { id } = action.payload;
      state.id = id;
    },
  },
});

/* ---------- SELECTORS ---------- */
const selectUserId = (state: RootState) => state.users.id;

export const { setUsersData } = userSlice.actions;
export { selectUserId };
export default userSlice.reducer;
