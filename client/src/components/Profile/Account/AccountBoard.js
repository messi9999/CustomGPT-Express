import React from "react";
import AuthService from "services/auth.service";
import BackSideBar from "../BackSideBar";



export default function AccountBoard() {
  const currentUser = AuthService.getCurrentUser();

  return (
      // <div className="flex flex-col w-full">
      //   <BackSideBar />
      //   <div className="flex flex-col w-full mx-16 my-16 h-screen">
      //     <div className="flex flex-col text-[20px] lg:text-[28px] font-oswald mt-[100px]">
      //       <div className="justify-start gap-x-6">
      //         <label className="w-[150px] text-right font-bold">Username: </label>
      //         <span>{currentUser.username}</span>
      //       </div>
      //       <div className="justify-start gap-x-6">
      //         <label className="w-[150px] text-right font-bold">Email: </label>
      //         <span>{currentUser.email}</span>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="flex flex-col w-full h-screen">
      <BackSideBar />
      <div className="flex justify-center items-center w-full h-full">
        {/* <div className="mt-[10vh] w-[90%] lg:w-[60%] flex justify-center items-center lg:justify-between flex-col lg:flex-row gap-10">
          <Subscription />
        </div> */}
        <div className="mt-[10vh] w-[90%] lg:w-[60%] flex justify-center items-center">
        <div className="flex flex-col w-full mx-16 my-16 h-screen">
          <div className="flex flex-col text-[20px] lg:text-[28px] font-oswald mt-[100px]">
            <div className="justify-start gap-x-6">
              <label className="w-[150px] text-right font-bold">Username: </label>
              <span>{currentUser.username}</span>
            </div>
            <div className="justify-start gap-x-6">
              <label className="w-[150px] text-right font-bold">Email: </label>
              <span>{currentUser.email}</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
