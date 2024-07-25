import React, { useEffect, useState } from "react";
import AuthService from "services/auth.service";
// import BackSideBar from "../BackSideBar";
import axios from "axios";
import CommunityProfile from "components/Community/CommunityProfile";
import TitleBar from "components/Community/TitleBar";
import { BASEURL } from "config/config";

export default function AccountBoard() {
  const currentUser = AuthService.getCurrentUser();

  const [count, setCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(currentUser.roles.includes("ROLE_ADMIN"));

    if (isAdmin) {
      

      const header = {
        "Content-Type": "application/json",
        "x-access-token": currentUser.accessToken,
      };
      axios.get(`${BASEURL}/api/test/admin`).then((res) => {
        setCount(res.data.userCount)
      }).catch((error) => { alert(error) })
    }
  }, [currentUser, isAdmin])


  return (

    <div className="flex flex-col w-full h-screen">
      {/* <BackSideBar /> */}
      <div className="flex bg-[#faedda] flex-col justify-start items-center w-full h-full">
        <div className="flex justify-center pt-6 bg-[#faedda] w-full">
          <div className="w-4/5 md:w-[500px] py-2">
            <div className='my-3 pb-5 rounded-lg bg-[#fcf4e6] shadow-md w-full p-2'>
              <div className="flex flex-col text-[18px] lg:text-[20px] font-oswald">
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
                {
                  isAdmin && (<div className="justify-start gap-x-6">
                    <label className="w-[150px] text-right font-bold">
                      Total Users:{" "}
                    </label>
                    <span>{count}</span>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
        <CommunityProfile />
      </div>
      <TitleBar />
    </div>
  );
}
