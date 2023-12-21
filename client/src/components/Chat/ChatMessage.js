import React from "react";
import WordByWordAnimation from "../WordByWordAnimation";

export default function ChatMessage({ message }) {
  const isUserMessage = message.type === "user";

  return (
    <li>
      {isUserMessage ? (
        <div className="flex justify-end">
          <div className="text-[20px] bg-[#f7e3be] rounded-lg p-2 px-4 py-4 m-2 inline-block font-oswald">
            {message.text}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="text-[20px] p-2 py-4 m-2 font-serif">
            <WordByWordAnimation text={message.text} delay={20} />
          </div>
        </div>
      )}
    </li>
  );
}
