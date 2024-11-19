import { useState, useEffect } from "react";

const useTheme = () => {
  const getInitialTheme = () => localStorage.getItem("theme") || "synthwave";

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "synthwave" ? "winter" : "synthwave"));
  };

  useEffect(() => {
    // Persist theme and apply it to the HTML element
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Ensure the theme is set on the first render
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", getInitialTheme());
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
