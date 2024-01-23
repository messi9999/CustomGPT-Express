import React from "react";
import Subscription from "./Subscription";
import BackSideBar from "../BackSideBar";
import AuthService from "services/auth.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "services/user.service";

export default function PaymentBoard() {
  const currentUser = AuthService.getCurrentUser();

  const navagate = useNavigate()

  const PaymentInfo = () => {
    const handleOnCancelPayment = () => {
      axios
      .post("/api/payment/payment-cancel", {
        subscriptionId: currentUser.subscription.subscriptionID,
        userId: currentUser.id
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": currentUser.accessToken,
        }
      })
      .then((res) => {
        alert(res.data.message)
        UserService.getUserBoard(currentUser.id).then((res) => {
          console.log(res.data)
        }).catch((error) => {
          alert(error)
        })
        navagate("/profile/payment/cancel")
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
    }
    return (
      <div>
        <div className="text-3xl mb-4 flex justify-center font-serif text-sky-700">
          <label>Payment Status</label>
        </div>
        <div className="text-2xl flex flex-col gap-4 font-serif">
          {/* <p>{"1. Plan Type: " + currentUser.subscription.planType}</p> */}
          <p>{"1. Plan Type: Unlimited"}</p>
          <p>
            {"2. Your payment started at " +
              currentUser.subscription.planStartDate} 
          </p>
          <p>
            {"3. Your payment will be ended at " +
              currentUser.subscription.planEndDate}
          </p>
          <p>
            {"4. Your your payment period is " +
              currentUser.subscription.planDuration +
              " days"}
          </p>
          <p>
            {"5. Free trial will be expired at " +
              currentUser.subscription.trialEndDate}
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button className="text-2xl bg-red-400 text-white px-4 py-2 rounded-full font-bold" onClick={handleOnCancelPayment}>Cancel Subscription</button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <BackSideBar />
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[90%] lg:w-[60%] flex justify-center items-center">
          {"planStartDate" in currentUser.subscription ? (
            <PaymentInfo />
          ) : (
            <Subscription />
          )}
          {/* <PaymentInfo /> */}
        </div>
      </div>
    </div>
  );
}
