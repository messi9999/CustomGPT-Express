import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as PaymentIcon } from "assets/icons/payment-icon.svg";

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18V17.2C4 16.6333 4.146 16.1123 4.438 15.637C4.72933 15.1623 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6457 8.75 13.387C9.81667 13.129 10.9 13 12 13C13.1 13 14.1833 13.129 15.25 13.387C16.3167 13.6457 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2707 15.1623 19.562 15.637C19.854 16.1123 20 16.6333 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.021 19.8043 18.55 20 18 20Z"></path>
    </svg>
  );
};

const BackIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1408 17.6558C10.9157 17.8808 10.6106 18.0072 10.2924 18.0072C9.97418 18.0072 9.66902 17.8808 9.44398 17.6558L4.64398 12.8558C4.41902 12.6308 4.29264 12.3256 4.29264 12.0074C4.29264 11.6892 4.41902 11.3841 4.64398 11.159L9.44398 6.35902C9.55468 6.24441 9.68709 6.15299 9.8335 6.0901C9.9799 6.02721 10.1374 5.99411 10.2967 5.99272C10.456 5.99134 10.6141 6.0217 10.7615 6.08204C10.909 6.14237 11.043 6.23148 11.1557 6.34415C11.2683 6.45682 11.3574 6.5908 11.4178 6.73828C11.4781 6.88575 11.5085 7.04377 11.5071 7.2031C11.5057 7.36244 11.4726 7.5199 11.4097 7.66631C11.3468 7.81271 11.2554 7.94512 11.1408 8.05582L8.38918 10.8074L17.4924 10.8074C17.8106 10.8074 18.1159 10.9339 18.3409 11.1589C18.566 11.3839 18.6924 11.6892 18.6924 12.0074C18.6924 12.3257 18.566 12.6309 18.3409 12.8559C18.1159 13.081 17.8106 13.2074 17.4924 13.2074L8.38918 13.2074L11.1408 15.959C11.3657 16.1841 11.4921 16.4892 11.4921 16.8074C11.4921 17.1256 11.3657 17.4308 11.1408 17.6558Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const ProfileComponents = ({ item }) => {
  const Component = item.Icon;
  return (
    <>
      <div className="px-6 pb-6 pt-4 lg:pb-8 lg:pt-0">
        <NavLink
          to={`/profile/${item.tag}`}
          className="flex h-14 w-full items-center justify-between rounded-md px-2 py-4 font-sans text-body-m-mobile text-primary-700 bg-[#f3eedd] hover:bg-neutral-300"
        >
          <div className="flex items-center space-x-2">
            <Component />
            <span>{item.text}</span>
          </div>
        </NavLink>
      </div>
    </>
  );
};

const profiles = [
  {
    Icon: UserIcon,
    text: "Account",
    tag: "account",
  },
  {
    Icon: PaymentIcon,
    text: "Payment",
    tag: "payment",
  },
];

export default function ProfileArea() {
  return (
    <div className="w-full h-screen lg:w-[450px] lg:shrink-0 lg:border-r lg:border-neutral-300 flex flex-col">
      <div className="bg-transparent">
        <div className="flex items-center py-5 mt-2 rounded-t-[28px] md:mt-0 md:rounded-none px-4 lg:px-6">
          <NavLink
            to="/create"
            className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
          >
            <BackIcon />
          </NavLink>
          <div className="grow text-primary-700">
            <h1 className="hidden text-[24px] font-bold text-h-l-mobile lg:block lg:pl-0">
              Profile
            </h1>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto mb-14 lg:mb-0">
        <div className="pl-6 font-bold text-[32px] text-h-l-mobile lg:hidden">
          Profile
        </div>
        {profiles.map((item, idx) => (
          <ProfileComponents item={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
