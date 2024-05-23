import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentTextProcessingDetail } from "../../../features/processing/textProcessingSlice";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  performModelTraining,
  completeModelTraining,
} from "../../../api/processing/textProcessing";
import TopicModellingChart from "../charts/TopicModellingChart";
import SpinLoading from "../../common/utils/SpinLoading";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
const RunAnalysisDialog = ({
  openRunAnalysisModal,
  closeRunAnalysisModal,
  processType,
}) => {
  const [selectTopics, setSelectTopics] = useState(0);
  const [isRunning, setIsRunning] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [plotData, setPlotData] = useState({});
  const [modellingSummary, setModellingSummary] = useState(null);
  const processingInstance = useSelector(selectCurrentTextProcessingDetail);
  const handleSelectTopicsChange = (e) => setSelectTopics(e.target.value);
  const navigate = useNavigate();
  const handleProcessing = async () => {
    setIsRunning(1);
    setError("");
    performModelTraining(processType, processingInstance.id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setPlotData(res.data);
          setIsRunning(2);
        }
      })
      .catch((error) => {
        console.log(error.response.detail[0]);
      });
  };

  const completeModelling = () => {
    completeModelTraining(
      processType,
      plotData.lda_model_instance,
      selectTopics
    )
      .then((res) => {
        if (res.status === 200) {
          setIsRunning(3);
          setModellingSummary(res.data);
          setTimeout(() => {
            closeRunAnalysisModal();
            setIsRunning(0);
            setPlotData({});
            setModellingSummary(null)
            setSelectTopics(0)
          }, 6000);
        }
      })
      .catch((error) => {
        console.log(error.response.detail);
      });
  };

  const handleClose = () => {
    closeRunAnalysisModal();
    setIsProcessing(false);
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
            {processType === "lda"
              ? "LDA Model Training"
              : "LSA Model Training"}
          </Typography>
        </div>

        {isRunning === 0 && (
          <div>
            <Typography>
              Click "Start" below to commence {processType} modelling and follow
              the prompts.
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleProcessing}
              >
                Start
              </Button>
            </div>
          </div>
        )}
        {isRunning === 1 && <SpinLoading text={"Running Topic Modelling..."} />}
        {isRunning === 2 && (
          <div>
            <TopicModellingChart plotData={plotData.topic_coherence_results} />
            <Typography>
              The graph above shows topic coherence values. Observe at what
              point the graph is at its second peak. Check for where the graph
              increases, reaches a maximum and then decreases and increases
              again. That max point before the second decrease is the number of
              coherent topics. Input the number of Topics below, then click
              "Complete Modelling".
            </Typography>
          </div>
        )}
        {isRunning === 2 && (
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <TextField
                label="Coherent Topics"
                type="number"
                value={selectTopics}
                onChange={handleSelectTopicsChange}
                fullWidth
                sx={{ mr: 1 }}
              />
              {!isProcessing ? (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={completeModelling}
                >
                  Complete Modelling
                </Button>
              ) : (
                <Box>
                  <Typography sx={{ mt: 2, color: "primary.main" }}>
                    Finalizing...
                  </Typography>
                </Box>
              )}
            </Box>
            {error && (
              <Typography sx={{ mt: 2, color: "error.main" }}>
                {error}
              </Typography>
            )}
          </Box>
        )}
        { modellingSummary && (<div
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
            {processType} topic modelling was successful for {modellingSummary.name} SRS Document. {modellingSummary.topics} coherent
            topics were found and saved, with a coherence score of {modellingSummary.coherence}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/user/${processType}-analysis`)}
          >
            Proceed to Analysis
          </Button>
        </div>)}
      </Box>
    </Dialog>
  );
};

export default RunAnalysisDialog;
