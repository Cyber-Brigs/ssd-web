import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className=" flex flex-col md:flex md:flex-row py-6 md:justify-between md:items-center navbar">
      <img
        src="https://www.nrf.go.ke/wp-content/uploads/2023/06/NRF-LOGO-LOCKUP-Site-Icon.png"
        alt="Logo"
        className="ml-5 md:w-[200px] w-[100px]"
      />
      <div
        className={`absolute md:static flex flex-col md:flex-row w-full md:mt-[0] mt-2 md:h-[0] h-[200px] md:flex  md:justify-end md:items-center md:flex-1 md:gap-10 bg-[#2e4161] border-t-[2px] border-custom-blue md:border-hidden md:bg-inherit z-[1] md:z-auto transition-all duration-500 ease-in`}
      >
        <button
          onClick={() => navigate("/log-in")}
          className="md:mt-[0] mt-5 cursor-pointer md:border-custom-blue md:border-[2px] md:rounded-[8px] md:mr-4 md:p-2 md:h-50 text-custom-blue text-[18px] transition-transform transform hover:-translate-y-1"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="md:mt-[0] mt-5 cursor-pointer md:inline-flex md:rounded-[8px] md:flex-col md:items-center md:justify-center md:mr-4 p-2 h-50 text-white flex-shrink-0 rounded-10 bg-custom-blue transition-transform transform hover:-translate-y-1"
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
