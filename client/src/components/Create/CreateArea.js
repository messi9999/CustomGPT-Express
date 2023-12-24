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
