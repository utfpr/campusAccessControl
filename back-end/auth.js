module.exports = {
  TOKEN_KEY: '',
  getToken: () => localStorage.getItem(TOKEN_KEY),
  storeToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  eraseToken: () => localStorage.removeItem(TOKEN_KEY)
}