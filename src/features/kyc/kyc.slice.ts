import { KycSchemaType } from "@/lib/schemas/kyc/upload-kyc";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: Partial<KycSchemaType> = {
  firstName: undefined,
  middleName: undefined,
  lastName: undefined,
  dateOfBirth: undefined,
  mobileNumber: undefined,
  birthCountryId: undefined,
  permanentAddress: undefined,
  temporaryAddress: undefined,
  documentBack: undefined,
  documentFront: undefined,
  identityTypeId: undefined,
  identityNo: undefined,
  identityIssuedBy: undefined,
  identityIssuedDate: undefined,
  identityExpiryDate: undefined,
  identityIssuedCountryId: undefined,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    // set the form data
    setKycData: (state, action: PayloadAction<Partial<KycSchemaType>>) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("EAGLE_REMIT_KYC", JSON.stringify(newState));
      return newState;
    },

    // remove the form data
    clearKycData: () => {
      localStorage.removeItem("EAGLE_REMIT_KYC");
      localStorage.removeItem("DOCUMENT_FRONT");
      localStorage.removeItem("DOCUMENT_BACK");
      return initialState;
    },
  },
});

/* ---------- SELECTORS ---------- */
const selectKycState = (state: RootState) => state.kyc;

export const { setKycData, clearKycData } = kycSlice.actions;
export default kycSlice.reducer;
export { selectKycState };
