export const TOKEN_KEY = "uni_token";
export const STATUS = "uni_status";
export const ID = "uni_id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getStatus = () => localStorage.getItem(STATUS);
export const getUserId = () => localStorage.getItem(ID);

export const login = (token, status, id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(STATUS, status);
  localStorage.setItem(ID, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STATUS);
  localStorage.removeItem(ID);
};