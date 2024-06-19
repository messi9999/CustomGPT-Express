import React from "react";
import WordByWordAnimation from "../WordByWordAnimation";

export default function ChatMessage(props) {
  const isUserMessage = props.message.type === "user";

  return (
    <li>
      {isUserMessage ? (
        <div className="flex justify-end">
          <div className="text-[20px] bg-[#f7e3be] rounded-lg p-2 px-4 py-4 m-2 inline-block font-oswald shadow-md">
            {props.message.text}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="text-[20px] p-2 py-4 m-2 font-serif">
            {props.id === props.length - 1 ? (
              <WordByWordAnimation text={props.message.text} delay={20} />
              // <div>{props.message.text}</div>
            ) : (
              <div>{props.message.text}</div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
