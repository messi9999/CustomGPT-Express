import React, { useState, useEffect } from "react";

const WordByWordAnimation = ({ text, delay }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0); // Corrected this line
  let words = text.split(" ");

  const processText = (inputText) => {
    // Function to convert URLs into anchor tags
    const formatURLs = (text) => {
      const urlRegex = /(?:\(|\[)?(https?:\/\/[^\s)\]]+)(?:\)|\])?/gi;
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
  useEffect(() => {
    setWordIndex(0);
    setDisplayedText("");
  }, [text]);

  useEffect(() => {
    if (wordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedText((currentText) => `${currentText}${words[wordIndex]} `);
        setWordIndex(wordIndex + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
    // Removed console.logs for cleaner code
  }, [wordIndex, delay, words]);

  return <div>{processText(displayedText)}</div>;
};

export default WordByWordAnimation;
