import { JSX, ReactElement } from "react";
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
  subtitle: string | ReactElement;
  links?: {
    title: string;
    to: string;
  };
  info?: string[];
  iconContainerClassName?: string;
};

/* -------------------- AUTH TYPES --------------------  */
export interface AuthResponse {
  userName: string;
  token: string;
  refreshToken: string;
  expiration: string;
  isVerified: boolean;
  isKycCompleted: boolean;
}

export interface ResponseError {
  status: number | string | null;
  message: string | null;
  data: number | string | null;
  errors: string[];
}
