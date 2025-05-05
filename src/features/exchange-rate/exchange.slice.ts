import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  exchangeRate: null as unknown as number,
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
  },
});

const selectCurrentExchangeRate = (state: RootState) =>
  state.exchangeRate.exchangeRate;

export const { setExchangeRate } = exchangeRateSlice.actions;
export { selectCurrentExchangeRate };
export default exchangeRateSlice.reducer;
