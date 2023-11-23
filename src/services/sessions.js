import { TOKEN_KEY } from "../config.js";
import apiFetch from "./apiFetch.js"

export const login = async (body) => {
  const { token, ...user } = await apiFetch("auth/login", { body });

  localStorage.setItem(TOKEN_KEY, token);
  return user;
}

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
}
