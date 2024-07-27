import { useState, useEffect } from "react";
import sun from "../assets/light.svg";
import moon from "../assets/moon-outline.svg";
import { Link } from "react-router-dom";
// import './App.css'

function Header() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);
    document.body.classList.toggle("dark", newDark);
    localStorage.setItem("darkMode", newDark);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <header className="transition ease-in-out sticky top-0 z-10 w-full flex justify-between items-center p-6 md:px-16 bg-white dark:bg-dblue-300 shadow-lg">
        <p className="text-lg md:text-2xl font-bold text-dblue-700 dark:text-white">
          <Link to="/">Where in the world?</Link>
        </p>
        <div className="flex items-center cursor-pointer" onClick={toggleDark}>
          <img src={dark ? sun : moon} className="w-5 mr-2" alt="" />
          <p className="text-sm font-bold text-dblue-700 dark:text-white">
            {dark ? "Light Mode" : "Dark Mode"}
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
