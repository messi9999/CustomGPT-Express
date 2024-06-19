import React, { useContext } from "react";
import CreateButton from "./CreateButton";
import { CreateContext } from "common/Context";
import { NavLink } from "react-router-dom";

const CreateArea = () => {
  const creates = useContext(CreateContext).CREATES;

  return (
    <div className="w-full h-screen lg:w-[450px] lg:shrink-0 lg:border-r lg:border-neutral-300 flex flex-col">
      <div className="bg-transparent">
        <div className="flex items-center py-5 mt-2 rounded-t-[28px] md:mt-0 md:rounded-none px-4 lg:px-6">
          <NavLink
            to="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
          >
            <svg
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[14px] w-[14px]"
            >
              <rect
                x="1.8291"
                y="0.000244141"
                width="17.216"
                height="2.58239"
                rx="1.2912"
                transform="rotate(45 1.8291 0.000244141)"
                fill="currentColor"
              ></rect>
              <rect
                y="12.174"
                width="17.216"
                height="2.58239"
                rx="1.2912"
                transform="rotate(-45 0 12.174)"
                fill="currentColor"
              ></rect>
            </svg>
          </NavLink>
          <div className="grow text-primary-700">
            <h1 className="hidden text-[24px] font-bold text-h-l-mobile lg:block lg:pl-0">
              Create
            </h1>
          </div>
          <div className="flex flex-row gap-4">

          <NavLink
            to="/community/blogs"
            className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
            type="button"
          >
            <svg 
              fill="none" 
              height="20" 
              viewBox="0 0 20 20" 
              width="20" 
              xmlns="http://www.w3.org/2000/svg">
              <path 
                  d="M8.75 3.75C8.75 2.23122 7.51878 1 6 1C4.48122 1 3.25 2.23122 3.25 3.75C3.25 5.26878 4.48122 6.5 6 6.5C7.51878 6.5 8.75 5.26878 8.75 3.75ZM4.25 3.75C4.25 2.7835 5.0335 2 6 2C6.9665 2 7.75 2.7835 7.75 3.75C7.75 4.7165 6.9665 5.5 6 5.5C5.0335 5.5 4.25 4.7165 4.25 3.75Z" 
                  fill="#212121"/>
              <path d="M2.5 7.5H6.68252C6.51859 7.81013 6.39687 8.14601 6.32501 8.5H2.5C2.22386 8.5 2 8.72386 2 9V9.5C2 10.7591 3.09851 12.1138 5.09636 12.4309C4.77396 12.6501 4.50546 12.9426 4.31486 13.2845C2.20563 12.7119 1 11.0874 1 9.5V9C1 8.17157 1.67157 7.5 2.5 7.5Z" fill="#212121"/><path d="M7.87858 7.5C8.38298 6.88925 9.14603 6.5 10 6.5C10.854 6.5 11.617 6.88925 12.1214 7.5C12.3605 7.78952 12.5415 8.12881 12.6465 8.5C12.7139 8.73842 12.75 8.98999 12.75 9.25C12.75 10.32 12.1389 11.2473 11.2466 11.7019C10.8919 11.8825 10.4929 11.9885 10.0702 11.9991C10.0469 11.9997 10.0235 12 10 12C9.97654 12 9.95315 11.9997 9.92983 11.9991C9.50709 11.9885 9.10806 11.8826 8.75342 11.7019C7.86115 11.2473 7.25 10.32 7.25 9.25C7.25 8.98999 7.28608 8.73842 7.35352 8.5C7.4585 8.12881 7.63948 7.78952 7.87858 7.5ZM8.41841 8.5C8.31042 8.72731 8.25 8.9816 8.25 9.25C8.25 9.96407 8.67768 10.5782 9.29086 10.8504C9.50763 10.9466 9.74757 11 10 11C10.2524 11 10.4924 10.9466 10.7091 10.8504C11.3223 10.5782 11.75 9.96407 11.75 9.25C11.75 8.9816 11.6896 8.72731 11.5816 8.5C11.3362 7.98351 10.8453 7.60627 10.2597 7.51914C10.175 7.50653 10.0883 7.5 10 7.5C9.91175 7.5 9.82502 7.50653 9.74028 7.51914C9.15468 7.60627 8.66377 7.98351 8.41841 8.5Z" fill="#212121"/><path d="M15.6851 13.2845C15.4945 12.9426 15.226 12.6501 14.9036 12.4309C16.9015 12.1138 18 10.7591 18 9.5V9C18 8.72386 17.7761 8.5 17.5 8.5H13.675C13.6031 8.14601 13.4814 7.81013 13.3175 7.5H17.5C18.3284 7.5 19 8.17157 19 9V9.5C19 11.0874 17.7944 12.7119 15.6851 13.2845Z" fill="#212121"/><path d="M14.4872 13.3706C14.2234 13.1398 13.878 13 13.5 13H6.5C6.06797 13 5.6786 13.1826 5.40489 13.4749C5.15376 13.7431 5 14.1036 5 14.5V15C5 16.9714 6.85951 19 10 19C13.1405 19 15 16.9714 15 15V14.5C15 14.0496 14.8015 13.6456 14.4872 13.3706ZM6 14.5C6 14.2239 6.22386 14 6.5 14H13.5C13.7761 14 14 14.2239 14 14.5V15C14 16.4376 12.5678 18 10 18C7.43216 18 6 16.4376 6 15V14.5Z" fill="#212121"/><path d="M14 1C15.5188 1 16.75 2.23122 16.75 3.75C16.75 5.26878 15.5188 6.5 14 6.5C12.4812 6.5 11.25 5.26878 11.25 3.75C11.25 2.23122 12.4812 1 14 1ZM14 2C13.0335 2 12.25 2.7835 12.25 3.75C12.25 4.7165 13.0335 5.5 14 5.5C14.9665 5.5 15.75 4.7165 15.75 3.75C15.75 2.7835 14.9665 2 14 2Z" 
                  fill="#212121" />
            </svg>
          </NavLink>
          <NavLink
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.196 19.021 4 18.55 4 18V17.2C4 16.6333 4.146 16.1123 4.438 15.637C4.72933 15.1623 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6457 8.75 13.387C9.81667 13.129 10.9 13 12 13C13.1 13 14.1833 13.129 15.25 13.387C16.3167 13.6457 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2707 15.1623 19.562 15.637C19.854 16.1123 20 16.6333 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.021 19.8043 18.55 20 18 20Z"></path>
            </svg>
          </NavLink>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto mb-14 lg:mb-0">
        <div className="pl-6 font-bold text-[32px] text-h-l-mobile lg:hidden">
          Create
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 pb-12 pt-8 lg:pb-8 lg:pt-0">
          {creates.map((item, idx) => (
            <CreateButton
              content={item}
              id={idx}
              key={idx}
              // onEvent={onEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateArea;
