import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LinearProgress,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DashView from "../users/DashView.jsx";
import ProcessedTextsTable from "./tables/ProcessedTextsTable.jsx";
import { getUserTextPreprocessingEntries } from "../../api/processing/textProcessing.js";

const TextPreProcessing = () => {
  const [loading, setLoading] = useState(true);
  const [textData, setTextData] = useState([]);
  const navigate = useNavigate();

  const fetchFileUploads = () => {
    getUserTextPreprocessingEntries().then((res) => {
      setTextData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFileUploads();
  }, []);
  return (
    <div className="bg-[#F5F5F5] py-3 right-side min-h-screen min-w-full ">
      <div className="ml-[250px] mt-[65px]">
        <DashView data={"Document Topic Modelling"} />
        <Card>
          <CardHeader
            title={
              <Typography variant="h6" color="black" fontWeight="500">
                Topic Modelling
              </Typography>
            }
            subheader={
              <IconButton
                color="primary"
                aria-label="upload file"
                component="label"
              >
                <Typography sx={{ color: "black" }}>
                  <HelpOutlineIcon color="primary" /> Before topic modelling,
                  specification documents must be preprocessed. From the SRS
                  Uploads page, click on preprocess text and ensure that the
                  status is "AVAILABLE"
                </Typography>
              </IconButton>
            }
            action={
              <Button
                variant="outlined"
                sx={{ borderRadius: 2, bgcolor: "primary" }}
                startIcon={<UploadIcon />}
                onClick={() => navigate("/user/uploads")}
              >
                Open Uploads
              </Button>
            }
          />
          <CardContent sx={{ p: "-2" }}>
            <Typography variant="h6" color="grey" fontWeight="500">
              Pre-Processed SRS Documents
            </Typography>
            {loading && <LinearProgress />}
            {!loading ? (
              textData.length > 0 ? (
                <ProcessedTextsTable textData={textData} />
              ) : (
                <Typography sx={{ color: "black" }}>
                  There are No Processed SRS Documents yet. To get started,
                  click "OPEN UPLOADS", then proceed to run the SRS
                  Pre-Processor.
                </Typography>
              )
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextPreProcessing;
