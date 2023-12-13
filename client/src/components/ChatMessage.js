import React from "react";

export default function ChatMessage({ message }) {
  const isUserMessage = message.type === "user";

  const processText = (inputText) => {
    // Function to convert URLs into anchor tags
    const formatURLs = (text) => {
      const urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
      return text.replace(
        urlRegex,
        (url) =>
          `<a className="text-cyan-500" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      );
    };

    // Function to convert **bold** text into <strong> tags
    const formatBoldText = (text) => {
      return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    // Split the text into lines
    return inputText.split("\n").map((line, index) => {
      if (line === "") {
        // Render a blank line
        return <div key={index} style={{ marginBottom: "1em" }} />;
      } else {
        // Format URLs and bold text
        const formattedLine = formatBoldText(formatURLs(line));
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
    });
  };

  return (
    <li>
      {isUserMessage ? (
        <div className='flex justify-end'>
          <div className='text-[20px] font-oswald bg-[#f7e3be] rounded-lg p-2 px-4 py-4 m-2 inline-block'>
            {message.text}
          </div>
        </div>
      ) : (
        <div className=''>
          <div className='text-[20px] font-oswald p-2 py-4 m-2'>
            {processText(message.text)}
          </div>
        </div>
      )}
    </li>
  );
}
