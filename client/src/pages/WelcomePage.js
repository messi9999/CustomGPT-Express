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
        <div>
          <div className="text-center text-[40px] sm:text-[60px] px-5 font-sans">
            <WordByWordAnimation
              text="Welcome to the PCOS Copilot"
              delay={50}
            />
          </div>
          <div className="text-center text-[20px] sm:text-[40px] px-5 font-sans">
            <WordByWordAnimation
              text="Your Personalized Natural PCOS Guide. Powered By AI"
              delay={100}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <NavLink
            to="/register"
            className="text-white bg-[#386bb6] font-sans text-[24px] lg:text-[36px] rounded-full p-1 px-7 hover:text-[26px] hover:lg:text-[38px] lg:hover:bg-[#415675]"
          >
            GET STARTED FOR FREE
          </NavLink>
        </div>
      </div>
    </div>
  );
}
