import { STORAGE } from "@/config/env.config";
import { decryptString, encryptString } from "./hash-string";

export type AuthSavedState = {
  refreshToken: string | null;
  expiresAt: number | null;
  token: string | null;
  user: string | null;
};
const loadAuthState = (): AuthSavedState | null => {
  try {
    const authData = sessionStorage.getItem(STORAGE.key);
    if (!authData) return null;

    const parsedData = JSON.parse(
      decryptString(authData, STORAGE.secret_key)
    ) as AuthSavedState;

    if (
      parsedData.refreshToken &&
      parsedData.expiresAt &&
      parsedData.expiresAt > Date.now()
    ) {
      return parsedData;
    }

    return null;
  } catch (error) {
    console.error("Auth state loading failed: ", error);
    return null;
  }
};

const saveAuthState = (authState: AuthSavedState): void => {
  try {
    const encryptData = encryptString(
      JSON.stringify(authState),
      STORAGE.secret_key
    );

    // Decide later whether to use sessionStorage or localStorage
    sessionStorage.setItem(STORAGE.key, encryptData);
  } catch (err) {
    console.error("Error while saving auth state: ", err);
  }
};

const clearAuthState = () => {
  sessionStorage.removeItem(STORAGE.key);
};

export { clearAuthState, loadAuthState, saveAuthState };
