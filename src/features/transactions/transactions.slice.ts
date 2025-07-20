import { SendMoneyFormSchemaType } from "@/lib/schemas/send-money/amountDetails";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: Partial<SendMoneyFormSchemaType> = {
  // 1. First Step - Amount Details
  sendingCountryId: "",
  sendingCurrencyId: "",
  payoutCountryId: "",
  payoutCurrencyId: "",
  sendingAmount: "",
  paymentTypeId: "",
  deliveryMethodId: "",
  remarks: "",

  // 2. Second Step - Receiver Details
  BankName: "",
  accountName: "",
  beneficiaryFirstName: "",
  beneficiaryMiddleName: "",
  beneficiaryLastName: "",
  beneficiaryMobileNumber: "",
  beneficiaryAddress: "",
  saveBeneficiary: false,

  // 3. Third Step - Card Details
  CardHolderName: "",
  CardNumber: "",
  CardExpiry: "",
  CardCsv: "",
  SavePaymentInfo: false,

  // 4. Fourth Step - Terms accept
  TermsAccepted: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // set create transaction state
    saveTransactionForm: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // clear the form
    clearTransactionForm: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

const selectTransactionFormData = (state: RootState) => state.transactions;

export { selectTransactionFormData };
export const { saveTransactionForm, clearTransactionForm } =
  transactionSlice.actions;
export default transactionSlice.reducer;
