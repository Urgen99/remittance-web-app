import { JSX } from "react";
import { Path } from "react-hook-form";
import { z } from "zod";

/* -------------------- FIELDS TYPES --------------------  */
export type InputFieldsType<T extends z.ZodTypeAny> = {
  name: Path<z.infer<T>>;
  type?: string;
  label?: string;
  isImportant?: boolean;
  placeholder?: string;
};

/* -------------------- FORM DESCRIPTION TYPES --------------------  */
export type FormDescription = {
  Icon: () => JSX.Element;
  title: string;
  subtitle: string;
  links?: {
    title: string;
    to: string;
  };
  info?: string[];
};
