import React from "react";
import Subscription from "./Subscription";
import BackSideBar from "../BackSideBar";

export default function PaymentBoard() {
  
  return (
    <div className="flex flex-col w-full">
      <BackSideBar />
      <div className="flex justify-center w-full h-screen">
        <div className="mt-[10vh] w-[90%] lg:w-[60%] flex items-center lg:justify-between flex-col lg:flex-row gap-10">
          <Subscription />
        </div>
      </div>
    </div>
  );
}
