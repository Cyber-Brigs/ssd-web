import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadIcon from "@mui/icons-material/Upload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { axiosApi } from "../../api";
import { getUserSrsUploads } from "../../api/processing/textProcessing.js";
import SrsUploadsTable from "./tables/SrsUploadsTable.jsx";
import DashView from "../users/DashView.jsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadSrs = () => {
  const [file, setFile] = useState(null);
  const [srsUploads, setSrsUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(0);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const fetchFileUploads = () => {
    getUserSrsUploads().then((res) => {
      if (res.status === 200) {
        setSrsUploads(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchFileUploads();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("document", file);
    try {
      await axiosApi.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setIsUploading(false);
      fetchFileUploads();
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="bg-[#F5F5F5] py-3 right-side min-h-screen min-w-full ">
      <div className="ml-[250px] mt-[65px]">
        <DashView
          data={"Software/System Requirement Specification Documents"}
        />
        <Card>
          {isUploading ? (
            <Box sx={{ m: 2, width: "100%" }}>
              <LinearProgress variant="determinate" value={progress} />{" "}
              {file && (
                <Typography sx={{ ml: 2 }}>Uploading {file.name}...</Typography>
              )}
            </Box>
          ) : (
            <CardHeader
              title={
                <Typography variant="h6" color="black" fontWeight="500">
                  Upload SRS Document
                </Typography>
              }
              subheader={
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onChange={handleFileChange}
                >
                  SELECT FILE
                  <VisuallyHiddenInput type="file" accept=".pdf" />
                </Button>
              }
              action={
                file && (
                  <Button
                    startIcon={<UploadIcon />}
                    type="submit"
                    variant="outlined"
                    onClick={handleUpload}
                  >
                    Upload Document
                  </Button>
                )
              }
            />
          )}
          {file && <Typography sx={{ ml: 2 }}>{file.name}</Typography>}
          <CardContent sx={{ p: "-2" }}>
            <Typography variant="h6" color="grey" fontWeight="500">
              User SRS Uploads
            </Typography>
            {loading && <LinearProgress />}
            {!loading ? (
              srsUploads.length > 0 ? (
                <SrsUploadsTable fileData={srsUploads} />
              ) : (
                <Typography sx={{ color: "black" }}>
                  <HelpOutlineIcon color="primary" />
                  There are no srs documents uploaded yet. To get started, click
                  Browse files above, and proceed to upload the SRS document.
                </Typography>
              )
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadSrs;
