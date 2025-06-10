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
  iconContainerClassName?: string;
};

/* -------------------- AUTH TYPES --------------------  */
export interface AuthState {
  user: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export interface AuthResponse {
  userName: string;
  token: string;
  refreshToken: string;
  expiration: string;
}

// eslint-disable-next-line
export interface RefreshTokenResponse extends AuthResponse {}
