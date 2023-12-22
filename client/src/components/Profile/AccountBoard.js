import React from "react";
import AuthService from "services/auth.service";

export default function AccountBoard() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="flex justify-center w-full mx-16 my-16">
      <div className="flex flex-col text-[28px] font-oswald gap-y-4">
        <div className="flex gap-x-6">
          <label className="w-[150px] text-right font-bold">Username:</label>
          <span>{currentUser.username}</span>
        </div>
        <div className="flex gap-x-6">
          <label className="w-[150px] text-right font-bold">Email:</label>
          <span>{currentUser.email}</span>
        </div>
      </div>
    </div>
  );
}
