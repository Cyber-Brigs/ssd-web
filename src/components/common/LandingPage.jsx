import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}
    >
      {" "}
      <Navbar />
      <div className="text-center">
        <div >
          <div className=" mx-auto p-1 flex justify-center">
            <div className="md:mt-[60px] mt-3">
              <h1 className="text-[20px]   animate-text text-[#000] items-center text-center md:text-2xl  lg:text-5xl font-extrabold  tracking-wider px-3">
                Cyber Brigs, Unleashing Innovation, <br />
                Solving One Huddle at a time!
              </h1>
              <p className="text-[12px] mt-4  md:text-[18px] text-center md:w-[588px] md:mt-7 lg:ml-20 text-[#4d4d4d]">
                Worry no more about the complexities of designing and
                maintaining a secure cyber system. Cyber Brigs offers a
                wholesome implementation, a blend of modern technology and
                seasoned experience to detect, mitigate and avert any vectors of
                attack. Lets dive into the world of AI, NLP, Statistics and
                Cyber Security to experience the magic!
              </p>
            </div>
          </div>
          <div className="flex gap-10 items-center justify-center md:w-full md:mt-[70px]">
            <button
              onClick={() => navigate("/sign-up")}
              className="px-3 py-2 bg-[#089BD9] rounded text-[13px] md:text-[18px]  text-white md:py-4 md:px-[20px] md:w-[239px]  transition-transform transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>
          <div className="animate-text absolute hidden lg:block rounded-full  filter bottom-[180px]  right-[140px]  ">
            <img
              src="/assets/avatar1.jpeg"
              className="rounded-full hidden lg:block border-[#b71079] border-2   w-[100px] h-[100px] "
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="animate-text absolute hidden lg:block left-[150px]  bottom-[90px] ">
            <img
              src="/assets/avatar2.jpeg"
              className="rounded-full hidden lg:block border-[#db3b14] border-2 4 w-[100px] h-[100px] "
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
