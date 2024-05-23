import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white text-[#12141D]">
      <div className="flex justify-between mt-3  bg-[#2e4161] p-2">
        <img
          src="https://www.nrf.go.ke/wp-content/uploads/2023/06/NRF-LOGO-LOCKUP-Site-Icon.png"
          alt="Logo"
          className="md:w-[200px] w-[100px]"
        />
        <p className="flex items-center  md:ml-11 ml-2 text-[8px] md:text-[16px] text-white">
          {" "}
          © Copyright {currentYear}, All Rights Reserved
        </p>

        <p className="flex items-center  md:mr-11  mr-2 md:text-[16px] text-[10px] mb-1 text-white">
          {" "}
          Privacy Policy Terms & Conditions
        </p>
        <div className="flex items-center space-x-4 mr-4 md:mr-20">
          <a
            href="https://www.facebook.com/nrfkenya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-gray-600 hover:text-blue-500 cursor-pointer transition" />
          </a>{" "}
          <a
            href="https://www.linkedin.com/company/national-research-fund-kenya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className="text-gray-600 hover:text-blue-500 cursor-pointer transition" />
          </a>
          <a
            href="https://twitter.com/nrfkenya"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="text-gray-600 hover:text-blue-500 cursor-pointer transition" />
          </a>
          <a
            href="https://www.youtube.com/@nationalresearchfundkenya8036"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube className="text-gray-600 hover:text-red-500 cursor-pointer transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
