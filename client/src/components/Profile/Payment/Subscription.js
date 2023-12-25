import axios from "axios";
import React from "react";
import AuthService from "services/auth.service";

export default function Subscription() {
  const plan = "basic"
  const currentUser = AuthService.getCurrentUser()

  const checkout = (plan, userId) => {
    axios
      .post("/api/payment/create-subscription-checkout-session", {
        plan: plan,
        customerId: userId,
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": currentUser.accessToken,
        }
      })
      .then((res) => {
        window.location = res.data.session.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  return (
    <div className="w-[240px] h-[400px] bg-[#f8eeee] rounded-2xl shadow-lg p-3">
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-[36px] p-2">Basic</h1>
        <p className="text-[20px] mb-[24px]">$3.97/month</p>
        <button onClick={() => checkout(plan, currentUser.id)} className="bg-blue-600 text-white w-[100px] py-1 rounded-xl">
          Subscribe
        </button>
      </div>
      <div className="p-3 mt-3">
        <ul className="pl-3 list-disc">
          <li className="mb-2">15 Creates</li>
          <li className="mb-2">No limited requestes</li>
        </ul>
      </div>
    </div>
  );
}
