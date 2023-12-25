import React, { useEffect, useState } from "react";
import { ReactComponent as PaymentSuccess } from "assets/icons/payment-success.svg";
import UserService from "services/user.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "services/auth.service";

const Success = () => {
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const navigate = useNavigate();

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserBoard(currentUser.id).then((user) => {
      setUserId(user.id);
      setSessionId(user.subscription.sessionId || "");
    });
  }, [userId, sessionId, currentUser]);

  const handlePaymentSuccess = () => {
    axios
      .post(
        "/api/payment/payment-success",
        {
          sessionId: sessionId,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": currentUser.accessToken,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          UserService.getUserBoard(userId)
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response));
              navigate("/dashboard");
            })
            .catch((error) => {
              alert(error);
            });
        }
        
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="m-0 p-0">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <div>
            <PaymentSuccess className="w-[200px] h-[200px] lg:block"/>
          </div>
          <h3 className="text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700">
            Payment Successful
          </h3>
          <button
            className="w-40 uppercase bg-[#009c96] text-white text-xl my-16 px-2 py-2 rounded"
            onClick={() => {
              handlePaymentSuccess();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
