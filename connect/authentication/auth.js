import { authenticate } from "../../store/actions/auth";
import { profile } from "../../store/actions/profile";
import Connect from "../../util/connect";

const connect_api = new Connect("http://localhost:8000/api/v2");

export const registerUser = (payload) =>
  connect_api.authenticate({
    path: "/auth/register",
    payload,
    action: authenticate,
  });

export const loginUser = (payload) =>
  connect_api.authenticate({
    path: "/auth/login",
    payload,
    action: authenticate,
  });

export const changePassword = (payload) =>
  connect_api.post({
    path: "/auth/change_password",
    payload,
  });

export const userProfile = () =>
  connect_api.get({
    path: "/account/profile",
    action: profile,
  });

export const updateProfile = (payload) =>
  connect_api.patch({
    path: "/account/profile",
    payload,
    action: profile,
  });
