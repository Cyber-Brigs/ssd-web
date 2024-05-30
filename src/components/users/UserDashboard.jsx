import React, { useState, useEffect } from "react";
import { getUserPlatformStats } from "../../api/statistics/userStats";
import SrsUploadsChart from "./SrsUploadsChart";
import TranslateIcon from '@mui/icons-material/Translate';
import TopicIcon from '@mui/icons-material/Topic';
import MemoryIcon from '@mui/icons-material/Memory';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WarningIcon from '@mui/icons-material/Warning';
import DashView from "./DashView";

const UserDashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getUserPlatformStats().then((res) => {
      setStats(res.data);
    });
  }, []);
  return (
    <div className="bg-[#F5F5F5] py-3 right-side  min-h-screen min-w-full ">
      <div className="ml-[250px] mt-[40px] ">
        <DashView data={"Dashboard"}/>
        <div className="flex flex-row gap-[30px]">
          <div className=" rounded-md bg-white shadow-md mt-[30px] w-[700px]">
            <h1 className="text-gray-700 font-semibold text-md mb-5 mt-10 ml-5">
              SRS Document Uploads
            </h1>
            <SrsUploadsChart plotData={stats.srs_uploads}/>
          </div>
          <div className="flex flex-col">
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <DriveFolderUploadIcon className="ml-7 w-7 h-7 text-custom-blue mt-5" />
                <p className=" mt-4">Total Uploads</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.total_uploads}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <MemoryIcon className="ml-7 w-7 h-7 text-custom-blue mt-5 " />

                <p className=" mt-4">Preprocessed Docs </p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.preprocessed_srs_docs}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <TopicIcon className="ml-7 w-7 h-7 text-custom-blue mt-5 " />
                <p className=" mt-4">LDA Analysis</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.lda_entries}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
          <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <PendingActionsIcon className="ml-7 w-7 h-7 text-custom-blue mt-5" />
                <p className=" mt-4">Pending Actions</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.pending_entries}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <WarningIcon className="ml-7 w-7 h-7 text-red-500 mt-5 " />
                <p className=" mt-4">Critical Vulnerabilities </p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.critical_vulnerabilities}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <TranslateIcon className="ml-7 w-7 h-7 text-custom-blue mt-5 " />
                <p className=" mt-4">LSA Analysis</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.lsa_entries}
              </p>
            </div>

          </div>
        </div>        
      </div>
    </div>
  );
};

export default UserDashboard;
