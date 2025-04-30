import { CompleteProfileSchemaType } from "@/lib/schemas/user/completeProfile";
import { base64ToFile } from "@/utils/readFile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getStoredForm = (): Partial<CompleteProfileSchemaType> => {
  const storedState = localStorage.getItem("userForm");

  if (!storedState) return {};

  try {
    const data = JSON.parse(storedState);
    const { documentFront, documentBack, ...rest } = data;

    return {
      ...rest,
      documentFront: documentFront
        ? base64ToFile(
            documentFront.base64,
            documentFront.name,
            documentFront.type
          )
        : undefined,
      documentBack: documentBack
        ? base64ToFile(
            documentBack.base64,
            documentBack.name,
            documentBack.type
          )
        : undefined,
    };
  } catch (error) {
    console.error("Error parsing user form. Error: ", error);
    return {};
  }
};

const initialState: Partial<CompleteProfileSchemaType> = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: null as unknown as Date,
  documentType: "license",
  documentNumber: "",
  documentExpiry: null as unknown as Date,
  documentFront: undefined as unknown as File,
  documentBack: undefined as unknown as File,
  city: "",
  addressLine: "",
};

const userFormSlice = createSlice({
  name: "userForm",
  initialState: getStoredForm() || initialState,
  reducers: {
    //  set form data
    setFormData: (
      state,
      action: PayloadAction<Partial<CompleteProfileSchemaType>>
    ) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("userForm", JSON.stringify(newState));
      return newState;
    },
    clearFormData: () => {
      localStorage.removeItem("userForm");
      return initialState;
    },
  },
});

export const { setFormData, clearFormData } = userFormSlice.actions;
export default userFormSlice.reducer;
