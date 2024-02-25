import { redirect } from "react-router-dom";

export function getAuthData() {
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  return { id: id, username: username, token: token };
}

export function tokenLoader() {
  return getAuthData();
}

export function checkAuthLoader() {
  const authData = getAuthData();

  if (!authData.token) {
    return redirect("/login");
  }
  return null;
}
