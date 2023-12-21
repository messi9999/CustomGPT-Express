import React from "react";
import AuthService from "services/auth.service";

export default function AccountBoard() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <div>{currentUser.username}</div>
    </div>
  );
}
