import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

import { ReactComponent as SendMsgIcon } from "assets/icons/sendmsg.svg";
import { ReactComponent as OpenSpeackerIcon } from "assets/icons/speaker-open.svg";
import { ReactComponent as CloseSpeakerIcon } from "assets/icons/speaker-close.svg";
// import { ReactComponent as BackCreateIcon } from "assets/icons/create-icon.svg";
// import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { CreateContext, DisplayTextContext } from "common/Context";

import AuthService from "services/auth.service";
import CalService from "services/cal.service";
import UserService from "services/user.service";
import { BASEURL, OPENAI_API_KEY, STREAMENDPOINT } from "config/config";
import OpenAI from "openai";
import AudioPlayer from "react-audio-player";
import { sleep } from "openai/core";
import TitleBar from "components/Community/TitleBar";
// import TitleBar from "components/Community/TitleBar";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
  const [isSpeaker, setIsSpeaker] = useState(false);

  const { displayText } = useContext(DisplayTextContext);

  const [audioSrc, setAudioSrc] = useState(null);

  const textareaRef = useRef(null);

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

  const header = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

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
      createId: idxOfCreate,
      freeAttempts: currentUser.freeAttempts,
    };

    // Get User info if freeAttemps is more than 0.
    if (currentUser.freeAttempts > 0) {
      currentUser = await UserService.getUserBoard(currentUser.id);
    }

    const response = await fetch(STREAMENDPOINT + "/api/chatbots/getResponseFromGpt", {
      method: "POST",
      headers: header,
      body: JSON.stringify(reqBody),
    });

    const reader = response.body.getReader();

    newMessage = {
      type: "chatbot",
      text: "",
    };
    appendChatHistory(newMessage);
    let streamResposne = "";
    // This function recursively reads data from the stream
    async function read() {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Stream finished");
        return;
      }

      // Assuming the streamed data is text, decode and process it
      const text = new TextDecoder().decode(value);

      try {
        streamResposne = streamResposne + text;
        setChatHistory((prevChatHistory) => {
          return prevChatHistory.map((item, index) => {
            if (index === prevChatHistory.length - 1) {
              // This is the last item, return the updated item
              return {
                type: "chatbot",
                text: streamResposne,
              };
            } else {
              // This is not the last item, return it as is
              return item;
            }
          });
        });
      } catch (error) {
        // Handle error here
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status) {
            alert(error.response.data.message);
            navigate("/profile/payment");
            window.location.reload();
          }
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          alert(error.message);
        }
        setChatHistory((currentArray) => currentArray.slice(0, -1));
      }

      // Recursively read the next chunk
      read();
    }

    await read();
    setIsEditable(true);
    await sleep(6000)

    // console.log(streamResposne)
    try {
      if (isSpeaker) {
        const mp3 = await client.audio.speech.create({
          model: "tts-1",
          voice: "alloy",
          input: streamResposne,
        });

        const buffer = new Uint8Array(await mp3.arrayBuffer());
        const blob = new Blob([buffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
      }

      if (currentUser.freeAttempts > 0) {
        currentUser = UserService.getUserBoard();
      }
    } catch (error) {
      console.log("error: ", error)
    }
  };

  const handleLogOut = useCallback(() => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  }, [navigate]);

  const { pathname } = useLocation();

  useEffect(() => {
    const LoadUserData = async () => {
      try {
        const response = await axios.post(
          BASEURL + "/api/chatbots/getChatHistory",
          {
            userId: currentUser.id,
            createId: idxOfCreate,
          },
          {
            headers: header,
          }
        );
        const newChatHistory = [];
        for (let i = 0; i < response.data.length; i++) {
          newChatHistory.push({
            type: response.data[i].chatType,
            text: response.data[i].text,
          });
        }
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          ...newChatHistory,
        ]);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 error here
          console.log("Unauthorized");
          handleLogOut();
        } else {
          // Handle other errors here
          console.log("An error occurred:", error);
        }
      }
    };
    LoadUserData();
  }, [currentUser.id, header, idxOfCreate, handleLogOut]);
  return (
    <>
      <div
        className={`relative grow overflow-x-auto lg:flex-auto lg:flex-col h-[100vh] ${pathname !== "/dashboard" ? "hidden lg:block" : ""
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
                    <div key={index}>
                      <ChatMessage
                        id={index}
                        message={msg}
                        length={chatHistory.length}
                      />
                    </div>
                  ))}

                  <div className="px-[16px]">
                    {!isEditable && chatHistory.length > 1 && <LoadingButton />}
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
                  className={`rounded-[36px] ${!isEditable || userMessage === ""
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
                        <i className="text-[#0a60f5]">Start free trial here!</i>
                      </u>
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <div className="text-slate-900 text-md mt-3 mb-1 flex justify-center">
            Feedback?{" "}
            <a
              href="https://forms.gle/3iFGAtmT8nSEG3Vq6"
              className="underline text-[#0a60f5]"
              target="_blank"
              rel="noreferrer"
            >
              <u>
                <i className="text-[#0a60f5]">
                  Share here and get free products.
                </i>
              </u>
            </a>
          </div>
          <div className="text-slate-900 text-md mb-3 flex justify-center">
            @Copyright Nourished Natural Health
          </div> */}
          <TitleBar className="items-end"/>
        </div>
        <div className="absolute inset-x-4 top-8 flex items-start lg:flex-row-reverse z-40">
          <div className="flex grow items-center lg:hidden">
            <NavLink
              to="/create"
              className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
            >
              <BackIcon />
            </NavLink>
          </div>
          <div className="flex gap-x-2">
            <button
              className="relative flex items-center justify-end rounded-full self-end overflow-hidden p-2 bg-neutral-200 hover:bg-neutral-200-hover"
              type="button"
            >
              {isSpeaker ? (
                <div>
                  <OpenSpeackerIcon
                    className="w-6 h-6 hover:cursor-pointer"
                    onClick={() => setIsSpeaker(false)}
                  />
                  <AudioPlayer src={audioSrc} autoPlay />
                </div>
              ) : (
                <CloseSpeakerIcon
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={() => setIsSpeaker(true)}
                />
              )}
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
