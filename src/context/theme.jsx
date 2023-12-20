import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const themeLS = (localStorage.getItem("theme") === "dark" || localStorage.getItem("theme") === "light") ? localStorage.getItem("theme") : "light";   
  const [theme, setTheme] = useState(themeLS);

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
