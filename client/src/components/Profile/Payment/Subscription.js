import axios from "axios";
import React from "react";
import AuthService from "services/auth.service";

export default function Subscription() {
  const plan = "basic";
  const currentUser = AuthService.getCurrentUser();

  const checkout = (plan, userId) => {
    axios
      .post(
        "/api/payment/create-subscription-checkout-session",
        {
          plan: plan,
          customerId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": currentUser.accessToken,
          },
        }
      )
      .then((res) => {
        window.location = res.data.session.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[240px] h-[500px] bg-[#f8eeee] rounded-2xl shadow-lg p-3">
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-[36px] p-2">Unlimited</h1>
        <p className="text-[20px] mb-[24px]">
          <span className="line-through">$9.97</span>
          <span> $3.97</span>
        </p>
        <button
          onClick={() => checkout(plan, currentUser.id)}
          className="bg-sky-700 text-white w-[100px] py-1 rounded-lg"
        >
          Start trial
        </button>
      </div>
      <div className="p-3 mt-3">
        <ul className="pl-3 list-disc">
          <li className="mb-2">
            <span>Launch Offer: </span>
            <span className="line-through text-lg">$9.97</span>
            <span className="text-lg"> $3.97</span>
            <span> per month</span>
          </li>

          <li className="mb-2">7 Day Free Trial Available</li>
          <li className="mb-2">Unlimited interactions</li>
          <li className="mb-2">Full personalization</li>
          <li className="mb-2">Chat history and personal profile</li>
          <li className="mb-2">First access to new features</li>
        </ul>
      </div>
    </div>
  );
}
