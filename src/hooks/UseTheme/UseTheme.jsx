import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "synthwave";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "synthwave" ? "winter" : "synthwave"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
