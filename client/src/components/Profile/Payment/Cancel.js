import React from 'react';
import { ReactComponent as PaymentCancel } from "assets/icons/payment-cancel.svg";

const Cancel = () => {
  return (
    <div className="m-0 p-0 bg-[#FDFDFD] min-h-screen">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-red-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <div>
            <PaymentCancel className="w-[200px] h-[200px] lg:block"/>
          </div>
          <h3 className="text-4xl pt-20 font-bold text-center text-slate-700">
            Your payment Canceled!
          </h3>
          <a 
            href="/dashboard" 
            className="w-auto uppercase bg-slate-900 text-white text-xl my-16 px-8 py-3 rounded"
          >
            Go To Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cancel;