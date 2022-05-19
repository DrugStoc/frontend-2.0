import {
  changePassword,
  loginUser,
  registerUser,
  updateProfile,
  userProfile,
} from "./auth";

export const register = registerUser;
export const login = loginUser;
export const user_profile = userProfile;
export const update_profile = updateProfile;
export const change_password = changePassword;
