import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormDescription, InputFieldsType } from "./type";

export interface FormComponentProps<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>;
  fields?: InputFieldsType<T>[];
  onSubmit: (data: z.infer<T>) => void;
  formDescription: FormDescription;
  links?: { title: string; to: string };
  info?: string[];
  isOTPForm?: boolean;
}

export interface Steps {
  step: number;
  name: string;
  Icon: React.FC<{ fill?: string }>;
}
