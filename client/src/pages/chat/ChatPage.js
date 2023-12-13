import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "components/ChatMessage";

import { ReactComponent as SendMsgIcon } from "assets/icons/sendmsg.svg";
import { ReactComponent as OpenSpeackerIcon } from "assets/icons/speaker-open.svg";
import { ReactComponent as CloseSpeakerIcon } from "assets/icons/speaker-close.svg";
import { ReactComponent as ChatRoomIcon } from "assets/icons/chat-room-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete-icon.svg";
import { ReactComponent as PlusIcon } from "assets/icons/plus-icon.svg";

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

function ChatHistoryItem({ summary, historyID, onEvent }) {
  return (
    <>
      <div className="w-full flex flex-row justify-between my-[20px] p-[4px] text-center rounded-[8px] border-2 border-[#f1e3ca]">
        <div className="flex justify-center w-full">
          <span>{summary}</span>
        </div>

        <DeleteIcon
          onClick={() => onEvent(historyID)}
          className="w-[24px] h-[24px]"
        />
      </div>
    </>
  );
}

export default function ChatPage() {
  const BASE_URL = process.env.REACT_APP_ENDPOINT;
  const [chatHistory, setChatHistory] = useState([
    {
      type: "",
      text: "",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isHistoryShow, setIsHistoryShow] = useState(false);

  const [chats, setChats] = useState([]);

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

  const handleCreateNewChat = async () => {
    console.log("Create New Button");
  };

  const handleDelete = (historyID) => {
    console.log(`Delete history of ${historyID}`);
  };

  return (
    <div className="flex flex-row bg-[#f7f2e9]">
      <div className="w-[88px] border-r-[2px] border-[#f3e9d8]">
        <div
          className="flex flex-col justify-center items-center gap-1 h-[68px] mt-[40px] bg-[#e7e2d9] hover:bg-[#dbd7ce] hover:cursor-pointer rounded-[12px] mx-[10px] font-chocolateGrande"
          onClick={() => {
            setIsHistoryShow(!isHistoryShow);
          }}
        >
          <ChatRoomIcon className="w-[24px] h-[24px]" />
          <span>History</span>
        </div>
      </div>
      {isHistoryShow && (
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
      )}
      <div className="flex flex-row min-h-screen w-full">
        <div className="relative pt-12 w-full flex justify-center">
          {isSpeaker ? (
            <OpenSpeackerIcon
              className="absolute w-[38px] h-[38px] right-12 hover:w-[40px] hover:h-[40px] hover:cursor-pointer"
              onClick={() => setIsSpeaker(false)}
            />
          ) : (
            <CloseSpeakerIcon
              className="absolute w-[38px] h-[38px] right-12 hover:w-[40px] hover:h-[40px] hover:cursor-pointer"
              onClick={() => setIsSpeaker(true)}
            />
          )}
          <div className="relative w-[40vw] min-w-[600px]">
            <div className="absolute top-0 w-full h-[50px] bg-opacity-gradient"></div>
            <div
              className=" h-[85vh] max-h-[80vh] overflow-y-auto scrollbar-thumb scrollbar-track"
              ref={scrollingDivRef}
            >
              <ul>
                {chatHistory.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))}
                {!isEditable && chatHistory.length > 1 && <LoadingButton />}
              </ul>
            </div>
            <div className="mt-5 flex items-end justify-between w-full h-auto bg-[#fcf7f1] rounded-[26px] border-2 border-[#f1e3ca]">
              <textarea
                ref={textareaRef}
                className="sm:w-full md:w-full  min-h-[54px] ml-[20px] pl-[10px] py-[10px] border-none focus:outline-none focus:ring-0 resize-none overflow-hidden bg-[#fcf7f1] text-[22px] rounded-[28px] font-oswald"
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
            <div className="text-slate-900 text-md mt-3 flex justify-center">
              @Copywrite Nourished Natural Health
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
