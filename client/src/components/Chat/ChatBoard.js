import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

import { ReactComponent as SendMsgIcon } from "assets/icons/sendmsg.svg";
// import { ReactComponent as OpenSpeackerIcon } from "assets/icons/speaker-open.svg";
// import { ReactComponent as CloseSpeakerIcon } from "assets/icons/speaker-close.svg";
import { ReactComponent as BackCreateIcon } from "assets/icons/create-icon.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { CreateContext, DisplayTextContext } from "common/Context";

import AuthService from "services/auth.service";
import CalService from "services/cal.service";
import UserService from "services/user.service";

function LoadingButton() {
  return (
    <div className="flex flex-wrap space-x-2 justify-right items-center bg-transparent">
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.28s]">
        Consulting{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.26s]">
        my{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.24s]">
        knowledge{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.20s]">
        base.{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.18s]">
        This{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.16s]">
        could{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.14s]">
        take{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.12s]">
        up{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.10s]">
        to{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.08s]">
        60{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.06s]">
        seconds{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.04s]">
        .{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce [animation-delay:-0.02s]">
        .{" "}
      </span>
      <span className="text-[15px] font-mono animate-bounce ">. </span>
    </div>
  );
}

export default function ChatBoard() {
  const navigate = useNavigate();
  const { CREATES, idxOfCreate } = useContext(CreateContext);

  const [chatHistory, setChatHistory] = useState([
    {
      type: "",
      text: "",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  // const [isSpeaker, setIsSpeaker] = useState(false);

  const { displayText } = useContext(DisplayTextContext);

  const textareaRef = useRef(null);
  // const scrollingDivRef = useRef(null);

  let currentUser = AuthService.getCurrentUser();

  const scrollingDivRef = useRef(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const isPayment = "planType" in currentUser.subscription;
  let freeTrails = -1;
  let duration = -1;
  if (isPayment) {
    freeTrails = CalService.calDateDifference(
      formattedDate,
      currentUser.subscription.trialEndDate
    );
    duration = CalService.calDateDifference(
      formattedDate,
      currentUser.subscription.planEndDate
    );
  }

  useLayoutEffect(() => {
    const div = scrollingDivRef.current;
    const shouldScrollToBottom =
      div.scrollTop + div.clientHeight === div.scrollHeight;

    if (!shouldScrollToBottom) {
      div.scrollTop = div.scrollHeight;
    }
  }, [chatHistory, displayText]);

  useEffect(() => {
    setChatHistory([
      {
        role: "assistant",
        text: CREATES[idxOfCreate].baseContext,
      },
    ]);
  }, [CREATES, idxOfCreate]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (isEditable && userMessage !== "") {
        handleSendMessage();
      }
    }
  };

  const handleTextAreaChange = (e) => {
    setUserMessage(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  });

  const appendChatHistory = (newMessage) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  };
  const handleSendMessage = async () => {
    console.log("Sending...");

    setIsEditable(false);
    var newMessage = {
      type: "user",
      text: userMessage,
    };
    appendChatHistory(newMessage);
    setUserMessage("");

    //Endpoint request here.
    const reqBody = {
      message: userMessage,
      assistantID: CREATES[idxOfCreate].assistantID,
      threadID: currentUser.threadID,
      userId: currentUser.id,
      freeAttempts: currentUser.freeAttempts,
    };

    const header = {
      "Content-Type": "application/json",
      "x-access-token": currentUser.accessToken,
    };

    // Get User info if freeAttemps is more than 0.
    if (currentUser.freeAttempts > 0) {
      currentUser = await UserService.getUserBoard(currentUser.id);
      console.log(currentUser);
    }

    try {
      const response = await axios.post(
        "/api/chatbots/getResponseFromGpt",
        reqBody,
        {
          headers: header,
        }
      );

      // Handle successful response here
      var chatBotMsg = response.data.message;

      newMessage = {
        type: "chatbot",
        text: chatBotMsg,
      };
      appendChatHistory(newMessage);
      if (currentUser.freeAttempts > 0) {
        currentUser = UserService.getUserBoard(currentUser.id);
      }
    } catch (error) {
      // Handle error here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status) {
          alert(error.response.data.message);
          console.log("1");
          navigate("/profile/payment");
          window.location.reload();
        }
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        alert(error.request);
        console.log("2");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        alert(error.message);
        console.log("3");
      }
      setChatHistory((currentArray) => currentArray.slice(0, -1));
    }

    setIsEditable(true);
  };

  const handleLogOut = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };

  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`relative grow overflow-x-auto lg:flex-auto lg:flex-col h-screen ${
          pathname !== "/dashboard" ? "hidden lg:block" : ""
        }`}
      >
        <div className="relative flex flex-col overflow-hidden sm:overflow-x-visible h-full pt-8 grow min-h-[calc(100%-60px)] sm:min-h-[calc(100%-120px)]">
          <div
            className="relative grow overflow-y-auto my-2"
            ref={scrollingDivRef}
          >
            <div className="relative space-y-6 px-5 text-primary-700 mx-auto max-w-[50rem] 2xl:max-w-[60rem]">
              <div className="absolute top-0 h-[50px] bg-opacity-gradient"></div>
              <div className="overflow-y-auto scrollbar-thumb scrollbar-track w-full">
                <ul>
                  {chatHistory.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                  ))}

                  <div className="px-[16px]">
                    {!isEditable && chatHistory.length > 1 && <LoadingButton />}
                    {/* <LoadingButton/> */}
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-h-[40%] px-5 sm:px-0 z-15 w-full mx-auto max-w-2xl 2xl:max-w-[60rem]">
            <div className="relative flex h-full w-full overflow-y-auto cursor-text items-end border border-transparent bg-neutral-25 shadow-input transition-all duration-300 bg-[#fcf7f1] shadow-md focus-within:border-neutral-400 focus-within:shadow-none hover:border-neutral-400 hover:shadow-none rounded-[30px]">
              <textarea
                ref={textareaRef}
                className="w-full min-h-[54px] ml-[20px] pl-[10px] py-[10px] border-none focus:outline-none focus:ring-0 resize-none overflow-y-hidden bg-[#fcf7f1] text-[22px] rounded-[28px] font-oswald"
                rows={1}
                placeholder="Type your Message"
                spellCheck="true"
                required
                // autoFocus
                value={userMessage}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleTextAreaChange(e)}
              ></textarea>
              <button
                className="p-[8px]"
                disabled={!isEditable || userMessage === ""}
                onClick={handleSendMessage}
              >
                <SendMsgIcon
                  className={`rounded-[36px] ${
                    !isEditable || userMessage === ""
                      ? "bg-slate-400"
                      : "bg-[#16a34a]"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-center text-lime-600">
            {isPayment ? (
              <div>
                {freeTrails >= 0 ? (
                  <p>{freeTrails + " Days Remaining On Free Trial"}</p>
                ) : (
                  <p>{"You payment period remains " + duration + " days"}</p>
                )}
              </div>
            ) : (
              <div>
                {currentUser.freeAttempts > 0 ? (
                  <p>{currentUser.freeAttempts + " free questions left"}</p>
                ) : (
                  <div className="flex flex-row">
                    <p>{currentUser.freeAttempts + " free questions left!"}</p>
                    <p>&nbsp;&nbsp;</p>

                    <NavLink to={"/profile/payment"}>
                      <u>
                        <i className="text-[#0a60f5]">Subscribe payment now!</i>
                      </u>
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-slate-900 text-md mt-3 mb-1 flex justify-center">
            {/* <NavLink to={"/feedback"}> */}
              Feedback?{" "}
              <a
                href="https://forms.gle/3iFGAtmT8nSEG3Vq6"
                className="underline text-[#0a60f5]"
                target="_blank"
                rel="noreferrer"
              >
                <u>
                  <i className="text-[#0a60f5]">
                    Please help improve this product here.
                  </i>
                </u>
              </a>
            {/* </NavLink> */}
          </div>
          <div className="text-slate-900 text-md mb-3 flex justify-center">
            @Copyright Nourished Natural Health
          </div>
        </div>
        <div className="absolute inset-x-4 top-8 flex items-start lg:flex-row-reverse z-40">
          <div className="flex grow items-center lg:hidden">
            <NavLink
              to="/Create"
              className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap"
              type="button"
            >
              <BackCreateIcon />
            </NavLink>
          </div>
          <div className="flex gap-x-2">
            <button
              className="relative flex items-center justify-end rounded-full self-end overflow-hidden p-2 bg-neutral-200 hover:bg-neutral-200-hover lg:hidden"
              type="button"
              onClick={() => {
                handleLogOut();
              }}
            >
              <LogoutIcon />
            </button>
            {/* <button
              className="relative flex items-center justify-end rounded-full self-end overflow-hidden p-2 bg-neutral-200 hover:bg-neutral-200-hover"
              type="button"
            >
              {isSpeaker ? (
                <OpenSpeackerIcon
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={() => setIsSpeaker(false)}
                />
              ) : (
                <CloseSpeakerIcon
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={() => setIsSpeaker(true)}
                />
              )}
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
