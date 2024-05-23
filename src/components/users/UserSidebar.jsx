import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/NRFSiteIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import MemoryIcon from "@mui/icons-material/Memory";
import TopicIcon from "@mui/icons-material/Topic";
import TranslateIcon from "@mui/icons-material/Translate";
const UserSidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setActivePage("dashboard");
    } else {
      setActivePage(pathnameArray[2]);
    }
  }, [pathnameArray]);
  return (
    <div className="flex">
      <div className=" bg-light-blue  p-4  fixed left-0 top-0 w-[250px] overflow-y-auto h-screen ">
        <div className="flex justify-between items-center">
          <img src={logo} />
        </div>
        <div className="mt-10">
          <button
            onClick={() => navigate("/user/dashboard")}
            style={{
              borderColor: activePage === "dashboard" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <DashboardCustomizeOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">Dashboard</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/user/uploads")}
            style={{
              borderColor: activePage === "uploads" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5  "
          >
            <div className="flex gap-4">
              <DriveFolderUploadIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]">SRS Uploads</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/user/preprocessing")}
            style={{
              borderColor:
                activePage === "preprocessing" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <MemoryIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">Text PreProcessing</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/user/lda-analysis")}
            style={{
              borderColor:
                activePage === "lda-analysis" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <TopicIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">LDA Analysis</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/user/lsa-analysis")}
            style={{
              borderColor:
                activePage === "lsa-analysis" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <TranslateIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">LSA Analysis</p>
            </div>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserSidebar;
