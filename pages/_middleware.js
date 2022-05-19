import { NextResponse } from "next/server";
import { user_profile } from "../connect/authentication";
import Connect from "../util/connect";

export default function middleware(req) {
  const { cookies } = req;

  let token = cookies.accessToken;
  const url = req.url;

  let register_path = url.includes("/register");
  let login_path = url.includes("/login");
  let forgot_password_path = url.includes("/forgot-password");

  if (login_path | register_path | forgot_password_path) {
    if (token !== undefined) {
        user_profile()
      return NextResponse.redirect(new URL("/account", url));
    }

    try {
      return NextResponse.next();
    } catch (error) {
      Cookies.remove("accessToken");
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  if (url.includes("/account") | url.includes("/cart")) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", url));
    }

    try {
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  return NextResponse.next();
}
