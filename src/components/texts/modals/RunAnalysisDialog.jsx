import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectModelId,
  selectProcessingId,
  selectDocName,
} from "../../../features/processing/textProcessingSlice";
import { setCurrentSimilarityResult } from "../../../features/result/similarityResultSlice";
import { Box, Dialog, IconButton, Button, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getSimilarityResults } from "../../../api/processing/textProcessing";
import SpinLoading from "../../common/utils/SpinLoading";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
const RunAnalysisDialog = ({
  openRunAnalysisModal,
  closeRunAnalysisModal,
  processType,
}) => {
  const model_id = useSelector(selectModelId);
  const processing_id = useSelector(selectProcessingId);
  const srs_name = useSelector(selectDocName);

  const [summaryResults, setSummaryResults] = useState({});
  const [isRunning, setIsRunning] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const runAnalysis = () => {
    setIsRunning(1);
    setError("");
    getSimilarityResults(processType, model_id, processing_id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setSummaryResults(res.data.results);
          dispatch(
            setCurrentSimilarityResult({ currentSimilarityResult: res.data.results })
          );
          setIsRunning(2);
          console.log(res.data.results);

        }
      })
      .catch((error) => {
        console.log(error.response.detail[0]);
      });
  };

  const handleClose = () => {
    closeRunAnalysisModal();
    setIsRunning(0);
    setError("");
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openRunAnalysisModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          p: 3,
          height: "80%",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 5, right: 5 }}>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <Typography component={"h2"}>
            {processType === "lda" ? "Run LDA Analysis" : "Run LSA Analysis"}
          </Typography>
        </div>

        {isRunning === 0  && (
          <div>
            <Typography>
              Click "ANALYZE VULNERABILITIES" below to commence {processType}{" "}
              analysis for the {srs_name} Requirement Specification document.
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <Button variant="outlined" color="primary" onClick={runAnalysis}>
                ANALYZE VULNERABILITIES
              </Button>
            </div>
          </div>
        )}
        
        {isRunning === 1 && (
          <SpinLoading text={"Analyzing vulnerabilities, please wait..."} />
        )}
        {isRunning === 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <DoneOutlineIcon color="success" fontSize="large" />
            <Typography component={"h2"}>
              {processType} analysis was successful for {srs_name} SRS Document.              
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                navigate(`/user/${processType}-analysis/results`)
              }
            >
              View Full Results
            </Button>
          </div>
        )}
      </Box>
    </Dialog>
  );
};

export default RunAnalysisDialog;
