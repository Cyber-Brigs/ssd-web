import React, { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { axiosApi } from "../../api";
import { getUserSrsUploads } from "../../api/processing/textProcessing.js";
import SrsUploadsTable from "./tables/SrsUploadsTable.jsx";
import DashView from "../users/DashView.jsx";
const UploadSrs = () => {
  const [file, setFile] = useState(null);
  const [srsUploads, setSrsUploads] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("document", file);
    try {
      await axiosApi.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };
  
  return (
    <div className="bg-[#F5F5F5] p-3 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <DashView
          data={"Software/System Requirement Specification Documents"}
        />
      </div>
      <div className="ml-60">
        <Card sx={{ m: 2 }}>
          <CardHeader
            title={
              <Typography variant="h6" color="black" fontWeight="500">
                Upload SRS Document
              </Typography>
            }
            subheader={
              <label for="file-upload" class="custom-file-upload">
                <IconButton
                  color="primary"
                  aria-label="upload file"
                  component="label"
                  onChange={handleFileChange}
                >
                  <AddCircleOutlineIcon />
                  <input
                    accept=".pdf"
                    type="file"
                    style={{ display: "none" }}
                  />
                  <Typography
                    sx={{
                      border: "solid primary.main 2px",
                      padding: "5px",
                    }}
                  >
                    Browse Files
                  </Typography>
                </IconButton>
              </label>
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
          {file && <CardContent>{file.name}</CardContent>}
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
