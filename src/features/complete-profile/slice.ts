import { UserFormSchemaType } from "@/lib/formSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getStoredForm = (): Partial<UserFormSchemaType> => {
  const storedState = localStorage.getItem("userForm");

  if (storedState) {
    try {
      return JSON.parse(storedState);
    } catch (error) {
      console.error("Error parsing user form. Error: ", error);
    }
  }

  return {};
};

const initialState: Partial<UserFormSchemaType> = {
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
      action: PayloadAction<Partial<UserFormSchemaType>>
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
