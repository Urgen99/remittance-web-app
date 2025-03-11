import { UserFormSchemaType } from "@/lib/formSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<UserFormSchemaType> = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: null as unknown as Date,
  document: {
    type: "license",
    number: "",
    expiry: null as unknown as Date,
    document_front: undefined as unknown as File,
    document_back: undefined as unknown as File,
  },
  address: {
    city: "",
    addressLine: "",
  },
};

const userFormSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    //  set form data
    setFormData: (
      state,
      action: PayloadAction<Partial<UserFormSchemaType>>
    ) => {
      return { ...state, ...action.payload };
    },
    clearFormData: () => initialState,
  },
});

export const { setFormData, clearFormData } = userFormSlice.actions;
export default userFormSlice;
