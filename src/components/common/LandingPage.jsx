import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <div className="text-center mx-auto p-1">
          <div className="md:mt-[20px] mt-0">
            <h1 className="text-[20px] animate-text text-[#000] items-center text-center md:text-3xl lg:text-3xl font-extrabold tracking-wider px-2">
              Cyber Brigs, Unleashing Innovation, <br />
              Solving One Huddle at a time!
            </h1>
            <p className="text-[12px] mt-4 md:text-[18px] text-center md:w-[588px] md:mt-7 text-[#4d4d4d]">
              Worry no more about the complexities of designing and maintaining
              a secure cyber system. Cyber Brigs offers a wholesome
              implementation, a blend of modern technology and seasoned
              experience to detect, mitigate and avert any vectors of attack.
              Lets dive into the world of ML, NLP, Statistics and Cyber Security
              to experience the magic!
            </p>
          </div>
          <div className="flex gap-10 items-center justify-center md:w-full md:mt-[70px]">
            <button
              onClick={() => navigate("/sign-up")}
              className="px-3 py-2 bg-[#089BD9] rounded text-[13px] md:text-[18px] text-white md:py-4 md:px-[20px] md:w-[239px] transition-transform transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="animate-text absolute top-0 right-0 mt-[10px] mr-[60px]">
          <img
            src="/assets/avatar1.jpeg"
            className="rounded-full border-[#b71079] border-2 w-[100px] h-[100px]"
            style={{ objectFit: "cover" }}
            alt="Avatar"
          />
        </div>
        <div className="animate-text absolute bottom-0 left-0 mb-[10px] ml-[60px]">
          <img
            src="/assets/avatar2.jpeg"
            className="rounded-full border-[#db3b14] border-2 w-[100px] h-[100px]"
            style={{ objectFit: "cover" }}
            alt="Avatar"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
