
import { useState } from "react";
import NavLink from "../components/NavLink";
import Button from "../components/Button";

export default function Nav() {
  const [navState, setNavState] = useState(false);

  function handleClick() {
    setNavState((prev) => !prev);
  }

  return (
    <header className={`px-[5%] sm:px-[10%] py-1 w-full bg-white z-50 pt-2.5  sticky top-0 `}>
      <nav className="flex justify-between items-center  mb-2.5">
        <img
          src={'/Logo.png'}
          width="50"
          height="50"
          alt="site logo"
          className="h-auto sm:w-20"
        />

        {/* MOBILE VIEW MENU BUTTON */}
        <button onClick={handleClick} className="block sm:hidden">
          <div className="p-1.25 flex flex-col gap-1 text-[1.5rem] hover:cursor-pointer  hover:bg-[#3232324f] ">
            {navState ? (
              '✕'
            ) : (
              <>
                <span className="block w-6 h-1  bg-black"></span>
                <span className="block w-6 h-1  bg-black"></span>
                <span className="block w-6 h-1  bg-black"></span>
              </>
            )}
          </div>
        </button>

        {/* DESKTOP VIEW NAV LINKS */}
        <ul className="hidden ml-[8%] sm:flex items-center gap-4 list-none grow">
          <NavLink title="Home" href="#home" />
          <NavLink title="Services" href="#services" />
          <NavLink title="Who we are" href="#about-us" />
          <NavLink title="Contact us" href="#contact-us" />
          <Button title="Get Started" text='md:text-[1rem] sm:text-[0.7rem] lg:text-[1.25rem]' />
        </ul>
      </nav>

      {/* MOBILE VIEW NAVLINKS */}
      <ul
        className={` flex flex-col gap-1 sm:hidden ${navState ? "block" : "hidden"
          }`}
      >
        <NavLink title="Home" href="#home" />
        <NavLink title="Services" href="#services" />
        <NavLink title="Who we are" href="#who-we-are" />
        <NavLink title="Contact us" href="#contact-us" />
        <NavLink title="Get Started" href="#get-started" />
      </ul>
    </header>
  );
}
