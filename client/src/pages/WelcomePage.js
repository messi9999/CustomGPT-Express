import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const WordByWordAnimation = ({ text, delay }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0); // Corrected this line
  let words = text.split(" ");

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

  return <div>{displayedText}</div>;
};

export default function WelcomePage() {
  return (
    <div className="w-screen h-screen bg-[#fcf4e6] flex justify-center">
      <div className="w-screen lg:w-[1024px] h-screen pt-[20vh] pb-[20vh] flex flex-col justify-between align-middle">
        <div className="text-center text-[40px] sm:text-[60px] px-5 font-christmasSpark text-lime-800">
          <WordByWordAnimation
            text="Welcome To Nourished Natural Health"
            delay={100}
          />
        </div>
        <div className="flex justify-center">
          <NavLink
            to="/login"
            className="text-white bg-lime-800 font-chocolateGrande text-[24px] lg:text-[36px] rounded-full p-1 px-7 lg:hover:bg-lime-600"
          >
            GET STARTED
          </NavLink>
        </div>
      </div>
    </div>
  );
}
