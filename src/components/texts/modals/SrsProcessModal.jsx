import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUploadDetail } from "../../../features/upload/uploadSlice";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { performTextPreprocessing } from "../../../api/processing/textProcessing";
const SrsProcessModal = ({ openSrsProcessModal, closeSrsProcessModal }) => {
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const srsDoc = useSelector(selectCurrentUploadDetail);
  const handleStartPageChange = (e) => setStartPage(e.target.value);
  const handleEndPageChange = (e) => setEndPage(e.target.value);

  const handleProcessing = async () => {
    setIsProcessing(true);
    setError("");
    performTextPreprocessing(srsDoc.id, startPage, endPage).then((res)=> {
      if (res.status === 200) {
        setTimeout(() => {
          navigate("/preprocessing");
        }, 1500);
        setIsProcessing(false);
      }
    })
    .catch((error) => {
      console.log(error.response.detail[0])
    })
  };

  const handleClose = () => {
    closeSrsProcessModal();
    setIsProcessing(false);
    setError("");
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openSrsProcessModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          p: 4,
          height: "80%",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 5, right: 5 }}>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Typography>
          To commence pre-processing, please enter valid document's valid page
          boundaries.
        </Typography>
        {isProcessing ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Processing...</Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <TextField
                label="Start Page"
                type="number"
                value={startPage}
                onChange={handleStartPageChange}
                fullWidth
                sx={{ mr: 1 }}
              />
              <TextField
                label="End Page"
                type="number"
                value={endPage}
                onChange={handleEndPageChange}
                fullWidth
                sx={{ ml: 1 }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleProcessing}
            >
              Begin Processing
            </Button>
            {error && (
              <Typography sx={{ mt: 2, color: "error.main" }}>
                {error}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default SrsProcessModal;
