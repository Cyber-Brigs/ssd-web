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
  Box,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
    <Box
      sx={{
        mt: { xs: 12, sm: 12, md: 2 },
        mx: 3,
      }}
    >
      <Card
        sx={{
          width: { xs: "100vw", sm: "95vw", md: "80vw" },
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" color="black" fontWeight="500">
              Topic Modelling
            </Typography>
          }
          subheader={
            <Typography sx={{ color: "black" }}>
              <HelpOutlineIcon color="primary" /> Before topic modelling,
              specification documents must be preprocessed. From the SRS Uploads
              page, click on preprocess text and ensure that the status is
              "AVAILABLE"
            </Typography>
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
              <Box sx={{ overflowX: "auto" }}>
                <ProcessedTextsTable textData={textData} />
              </Box>
            ) : (
              <Typography sx={{ color: "black" }}>
                There are No Processed SRS Documents yet. To get started, click
                "OPEN UPLOADS", then proceed to run the SRS Pre-Processor.
              </Typography>
            )
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TextPreProcessing;
