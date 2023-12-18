import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "components/ChatMessage";
import DiscoverArea from "./components/DiscoverArea";

import { ReactComponent as SendMsgIcon } from "assets/icons/sendmsg.svg";
import { ReactComponent as OpenSpeackerIcon } from "assets/icons/speaker-open.svg";
import { ReactComponent as CloseSpeakerIcon } from "assets/icons/speaker-close.svg";
// import { ReactComponent as ProfileIcon } from "assets/icons/profile.svg";
import { ReactComponent as DiscoverIcon } from "assets/icons/discover-icon.svg";
import { ReactComponent as BackDiscoverIcon } from "assets/icons/discover-icon.svg";
// import { ReactComponent as DeleteIcon } from "assets/icons/delete-icon.svg";
// import { ReactComponent as PlusIcon } from "assets/icons/plus-icon.svg";

function LoadingButton() {
  return (
    <div className="flex space-x-2 justify-right items-center bg-transparent h-[2rem] dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-[#f1d297] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-[#f1d297] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-[#f1d297] rounded-full animate-bounce"></div>
    </div>
  );
}

// function ChatHistoryItem({ summary, historyID, onEvent }) {
//   return (
//     <>
//       <div className="w-full flex flex-row justify-between my-[20px] p-[4px] text-center rounded-[8px] border-2 border-[#f1e3ca]">
//         <div className="flex justify-center w-full">
//           <span>{summary}</span>
//         </div>

//         <DeleteIcon
//           onClick={() => onEvent(historyID)}
//           className="w-[24px] h-[24px]"
//         />
//       </div>
//     </>
//   );
// }

const DISVOCERS = [
  {
    title: "Create a PCOS Friendly Meal Plan",
    imgUrl:
      "https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fguided-experiences%2Fventing.jpg&w=256&q=100",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Great! Let’s make a meal plan together. Your meal plan will be PCOS friendly and customized to your needs.

    If there’s anything you don’t like in your final plan, let me know and we can always adjust it.
    
    Can you start off by telling me if you want a plan for 1 day, 1 week or even longer?
    `,
  },
  {
    title: "Explore Nutritional Supplement Options",
    imgUrl:
      "https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fguided-experiences%2Fventing.jpg&w=256&q=100",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Sure! Let’s create a personalized supplement plan for your PCOS type.

    First of all, can you start off by telling me some of the symptoms you are experiencing?
    
    If you changes to your plan at any time, let me know and we can make changes.
    `,
  },
  {
    title: "Understand my PCOS type",
    imgUrl:
      "https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fguided-experiences%2Fventing.jpg&w=256&q=100",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Sure! I'd love to help you understand your PCOS type. 

    Why don't you start by telling me some information about your symptoms? 
    
    Do you suffer from acne; hair loss; excess weight; insulin resistance or anything else related to PCOS?
    
    I may ask you a lot of questions, so if you don’t know an answer just say “I don’t know”.
    `,
  },
  {
    title: "Personalize a Workout Routine",
    imgUrl:
      "https://pi.ai/_next/image?url=https%3A%2F%2Fpi.ai%2Fpublic%2Fmedia%2Fguided-experiences%2Fventing.jpg&w=256&q=100",
    assistantID: "asst_yoLVpKKIOlDUgPmJDOHN88eh",
    baseContext: `Definitely! I can help you create a custom workout routine based on your age, fitness and energy levels.

    Let’s start with a question: what exercise do you love to do?
    
    If there is anything you don’t like in your routine, just let me know.
    `,
  },
];

export default function ChatPage() {
  // const BASE_URL = process.env.REACT_APP_ENDPOINT;
  const [chatHistory, setChatHistory] = useState([
    {
      type: "",
      text: "",
    },
    {
      type: "user",
      text: "Hello",
    },
    {
      type: "chatbot",
      text: "Hi, How can I assist you today?",
    },
    {
      type: "user",
      text: "What is machine learning?",
    },
    {
      type: "chatbot",
      text: "Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(false);
  // const [isHistoryShow, setIsHistoryShow] = useState(false);
  const [isDiscoverShow, setIsDiscoverShow] = useState(false);

  const [idxOfDiscover, setIdxOfDiscover] = useState(0);

  // const [chats, setChats] = useState([]);

  const textareaRef = useRef(null);
  const scrollingDivRef = useRef(null);

  useEffect(() => {
    const div = scrollingDivRef.current;
    const scrollStep = 8; // Adjust this value for faster or slower scrolling
    const scrollInterval = 10; // Time in milliseconds between each scroll step

    const scrollIntervalID = setInterval(() => {
      // Check if we've reached the bottom
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        clearInterval(scrollIntervalID); // Stop scrolling when the bottom is reached
      } else {
        div.scrollTop += scrollStep;
      }
    }, scrollInterval);

    // Clear interval on component unmount
    return () => clearInterval(scrollIntervalID);
  }, [chatHistory]);

  useEffect(() => {
    setChatHistory([
      {
        role: "assistant",
        text: DISVOCERS[idxOfDiscover].baseContext,
      },
    ]);
  }, [idxOfDiscover]);

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

    //Endpoint request here.
    const reqBody = {
      message: userMessage,
      assistantID: DISVOCERS[idxOfDiscover].assistantID,
    };

    try {
      const response = await axios.post(
        "/api/chatbots/getResponseFromGpt",
        reqBody
      );
      // Handle successful response here
      console.log(response.data);

      var chatBotMsg = response.data.message;

      newMessage = {
        type: "chatbot",
        text: chatBotMsg,
      };
      appendChatHistory(newMessage);
    } catch (error) {
      // Handle error here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.status) {
          alert(error.response.data.message);
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
      console.log(error.config);

      setChatHistory((currentArray) => currentArray.slice(0, -1));
    }
    setUserMessage("");
    setIsEditable(true);
  };

  // const handleCreateNewChat = async () => {
  //   console.log("Create New Button");
  // };

  // const handleDelete = (historyID) => {
  //   console.log(`Delete history of ${historyID}`);
  // };

  const handleDiscoverClick = (id) => {
    setIdxOfDiscover(id);
    setIsDiscoverShow(false);
  };

  return (
    <div className="flex h-screen bg-[#f7f2e9]">
      <div className="hidden w-26 flex-col items-center border-r border-neutral-300 p-3 pt-5 lg:flex">
        <div
          className={`mb-1 flex h-20 w-20 flex-col items-center justify-center rounded-xl text-neutral-900 hover:bg-neutral-300 hover:text-neutral-600 active:bg-neutral-200 active:text-neutral-900-tap cursor-pointer ${
            isDiscoverShow ? "bg-neutral-300" : ""
          }`}
          onClick={() => {
            setIsDiscoverShow(!isDiscoverShow);
          }}
        >
          <DiscoverIcon className="w-8 h-8" />
          <span>Discover</span>
        </div>
        {/* <div
          className="mb-1 p-2 flex h-20 w-20 flex-col items-center justify-center rounded-xl text-neutral-900 hover:bg-neutral-300 hover:text-neutral-600 active:bg-neutral-200 active:text-neutral-900-tap cursor-pointer"
          onClick={() => {
            setIsHistoryShow(!isHistoryShow);
          }}
        >
          <ProfileIcon className="w-[24px] h-[24px]" />
          <span>Profile</span>
        </div> */}
      </div>
      {/* {isHistoryShow && (
        <div className="w-[300px] border-r-[2px] border-[#f3e9d8] pt-[50px] px-[10px]">
          <button
            className="w-full flex flex-row justify-between my-[20px] p-[4px] text-center font-theolaKids rounded-[8px] border-2 border-[#f1e3ca] bg-[#f5dbad]"
            onClick={handleCreateNewChat}
          >
            <div className="flex justify-center w-full">
              <span>New Chat</span>
            </div>
            <PlusIcon className="w-[24px] h-[24px]" />
          </button>
          <ChatHistoryItem
            historyID={1}
            summary={"Chat1"}
            onEvent={handleDelete}
          />
          <ChatHistoryItem
            historyID={2}
            summary={"Chat2"}
            onEvent={handleDelete}
          />
          <ChatHistoryItem
            historyID={3}
            summary={"Chat3"}
            onEvent={handleDelete}
          />
        </div>
      )} */}
      <DiscoverArea
        open={isDiscoverShow}
        onEvent={handleDiscoverClick}
        onClose={() => setIsDiscoverShow(false)}
      />
      <div
        className={`relative grow overflow-x-auto lg:flex lg:flex-col ${
          isDiscoverShow ? "hidden" : ""
        }`}
      >
        <div className="relative flex flex-col overflow-hidden sm:overflow-x-visible h-full pt-8 grow">
          <div className="relative grow overflow-y-auto my-2">
            <div className="relative space-y-6 px-5 text-primary-700 mx-auto max-w-[50rem] 2xl:max-w-[60rem]">
              <div className="absolute top-0 h-[50px] bg-opacity-gradient"></div>
              <div
                className=" overflow-y-auto scrollbar-thumb scrollbar-track"
                ref={scrollingDivRef}
              >
                <ul>
                  {chatHistory.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                  ))}
                  {!isEditable && chatHistory.length > 1 && <LoadingButton />}
                </ul>
              </div>
            </div>
          </div>
          <div className="max-h-[40%] px-5 sm:px-0 z-15 w-full mx-auto max-w-2xl 2xl:max-w-[60rem]">
            <div className="relative flex h-full w-full cursor-text items-end border border-transparent bg-neutral-25 shadow-input transition-all duration-300 focus-within:border-neutral-400 focus-within:shadow-none hover:border-neutral-400 hover:shadow-none rounded-[30px]">
              <textarea
                ref={textareaRef}
                className="w-full min-h-[54px] ml-[20px] pl-[10px] py-[10px] border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-[#fcf7f1] text-[22px] rounded-[28px] font-oswald"
                rows={1}
                placeholder="Type your Message"
                spellCheck="true"
                required
                autoFocus
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
          <div className="text-slate-900 text-md my-3 flex justify-center">
            @Copyright Nourished Natural Health
          </div>
        </div>
        <div className="absolute inset-x-4 top-8 flex items-start lg:flex-row-reverse z-40">
          <div className="flex grow items-center lg:hidden">
            <button
              aria-label="Go back to discover"
              className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap"
              type="button"
              onClick={() => setIsDiscoverShow(true)}
            >
              <BackDiscoverIcon />
            </button>
          </div>
          <div>
            <button
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
