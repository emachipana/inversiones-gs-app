import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [ theme ]);

  const changeTheme = () => setTheme((theme) => theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme
      }}
    >
      { children }
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
