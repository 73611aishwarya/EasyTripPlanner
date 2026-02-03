import api from "./api"; 

export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const signUp = (name, email, password) => {
  return api.post("/auth/signup", {
    name,
    email,
    password,
  });
};
 
export const forgetPassword = (email) => {
  return api.post("/auth/forget-password", { email });
};