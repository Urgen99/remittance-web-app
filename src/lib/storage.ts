import { SESSION } from "./constant";
import { decryptString } from "./hash-string";
import { AuthState } from "./type";

const loadAuthState = () => {
  const authData = sessionStorage.getItem(SESSION.key);

  if (!authData) return null;

  const decryptedData = decryptString(authData, SESSION.SECRET_KEY);

  if (!decryptedData) return null;

  const authState = JSON.parse(decryptedData) as AuthState;

  const isValid = authState.expiresAt && authState.expiresAt > Date.now();

  if (isValid) {
    return { ...authState };
  }

  clearAuthState();

  return null;
};

const loadAuthState1 = (): AuthState => {
  try {
    const authData = sessionStorage.getItem(SESSION.key);

    if (!authData) return getDefaultAuthState();

    const authState = JSON.parse(authData) as AuthState;

    const isValid = authState.expiresAt && authState.expiresAt > Date.now();

    if (isValid) {
      return { ...authState };
    }

    clearAuthState();

    return getDefaultAuthState();
  } catch (error) {
    console.error("Error while loading auth state: ", error);
    clearAuthState();
    return getDefaultAuthState();
  }
};

const saveAuthState = () => {};

const saveAuthState1 = (authState: AuthState): void => {
  try {
    sessionStorage.setItem(SESSION.key, JSON.stringify(authState));
  } catch (error) {
    console.error("Error while saving auth state: ", error);
  }
};

const clearAuthState = () => {};

const clearAuthState1 = () => {
  try {
    sessionStorage.removeItem(SESSION.key);
  } catch (error) {
    console.error("Error while clearing auth state: ", error);
  }
};

export { clearAuthState, loadAuthState, saveAuthState };
