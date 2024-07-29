import React from "react";
import { ThemeContext } from "./Context";

export const ThemeProvider = ({ children }) => {
  const theme = {
    bgColor: "#fcf4e6",
  };

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
