import { SESSION } from "./constant";

export interface AuthState {
  user: string | null;
  token: string | null;
  email: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  password: string | null;
}

const loadAuthState = (): AuthState => {
  const defaultAuthState: AuthState = {
    user: null,
    token: null,
    email: null,
    refreshToken: null,
    expiresAt: null,
    password: null,
  };

  try {
    const authData = sessionStorage.getItem(SESSION.key);

    if (!authData) return defaultAuthState;

    const authState = JSON.parse(atob(authData)) as AuthState;

    const isValid =
      authState.expiresAt && new Date(authState.expiresAt) > new Date();

    if (isValid) {
      return { ...defaultAuthState, ...authState };
    }

    sessionStorage.removeItem(SESSION.key);
    return defaultAuthState;
  } catch (error) {
    console.error("Error while loading auth state: ", error);
    return defaultAuthState;
  }
};

const saveAuthState = (authState: AuthState): void => {
  try {
    const authData = btoa(JSON.stringify(authState));
    sessionStorage.setItem(SESSION.key, authData);
  } catch (error) {
    console.error("Error while saving auth state: ", error);
  }
};

const clearAuthState = () => {
  try {
    sessionStorage.removeItem(SESSION.key);
  } catch (error) {
    console.error("Error while clearing auth state: ", error);
  }
};
export { clearAuthState, loadAuthState, saveAuthState };
