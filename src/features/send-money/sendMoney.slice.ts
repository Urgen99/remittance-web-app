import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SendMoneyFormSchemaType } from "@/lib/schemas/send-money/amountDetails";

const initialState: Partial<SendMoneyFormSchemaType> = {
  // 1. First Step - Amount Details
  SendingCountry: "",
  SendingCurrency: "",
  ReceivingCountry: "",
  ReceivingCurrency: "",
  PaymentType: "card",
  DeliveryType: "delivery",
  Remarks: "",

  //   2. Second Step - Receiver Details
  BankName: "",
  AccountNumber: "",
  FirstName: "",
  MiddleName: "",
  LastName: "",
  PhoneNumber: "",
  AddressLine: "",
  SaveReceiverInfo: false,

  //   3. Third Step - Card Details
  CardHolderName: "",
  CardNumber: "",
  CardExpiry: "",
  CardCsv: "",
  SavePaymentInfo: false,

  //   4. Fourth Step - Terms accept
  TermsAccepted: false,
};

const sendMoneySlice = createSlice({
  name: "send-money",
  initialState,
  reducers: {
    // set send money form
    setSendMoneyForm: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // clear the form
    clearSendMoneyForm: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

const selectCurrentFormData = (state: RootState) => state.sendMoney;

export { selectCurrentFormData };
export const { setSendMoneyForm } = sendMoneySlice.actions;
export default sendMoneySlice.reducer;
