import React, { useEffect, useState } from "react";
import AuthService from "services/auth.service";
import BackSideBar from "../BackSideBar";
import axios from "axios";

export default function AccountBoard() {
  const currentUser = AuthService.getCurrentUser();

  const [count, SetCount] = useState(0);

  useEffect(() => {

    let isAdmin = currentUser.roles.includes("ROLE_ADMIN");
    if (isAdmin) {
      const reqBody = {
        userId: currentUser.id,
      };
  
      const header = {
        "Content-Type": "application/json",
        "x-access-token": currentUser.accessToken,
      };
      axios.post("/api/test/admin", reqBody, {
        headers: header,
      }).then((res) => {
        console.log(res.data)
        SetCount(res.data.userCount)
      }).catch((error) => {alert(error)})
    }
  }, [currentUser])


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
                <label className="w-[150px] text-right font-bold">
                  Username:{" "}
                </label>
                <span>{currentUser.username}</span>
              </div>
              <div className="justify-start gap-x-6">
                <label className="w-[150px] text-right font-bold">
                  Email:{" "}
                </label>
                <span>{currentUser.email}</span>
              </div>
              <div className="justify-start gap-x-6">
                <label className="w-[150px] text-right font-bold">
                  Total Users:{" "}
                </label>
                <span>{count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
