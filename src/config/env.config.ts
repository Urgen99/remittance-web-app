const BASE_URL = import.meta.env.VITE_SERVER;

const STORAGE = {
  key: import.meta.env.VITE_STORAGE_KEY,
  secret_key: import.meta.env.VITE_TOKEN_SECRET_KEY,
};
export { BASE_URL, STORAGE };
