import { SendMoneyFormSchemaType } from "@/lib/schemas/send-money/amountDetails";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const formInitialState: Partial<SendMoneyFormSchemaType> = {
  // 1. First Step - Amount Details
  sendingCountryId: "",
  sendingCurrencyId: "",
  payoutCountryId: "",
  payoutCurrencyId: "",
  sendingAmount: "",
  payoutAmount: "",
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

const initialState: Partial<SendMoneyFormSchemaType & { id?: string | null }> =
  {
    ...formInitialState,
    id: null,
  };

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // set create transaction state
    saveTransactionForm: (
      state,
      action: PayloadAction<Partial<SendMoneyFormSchemaType>>
    ) => {
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

    // set current created transaction id
    setCurrentTransactionId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
  },
});

const selectTransactionFormData = (state: RootState) => state.transactions;
const selectCurrentTransaction = (state: RootState) => state.transactions.id;

export { selectCurrentTransaction, selectTransactionFormData };

export const {
  saveTransactionForm,
  clearTransactionForm,
  setCurrentTransactionId,
} = transactionSlice.actions;
export default transactionSlice.reducer;
