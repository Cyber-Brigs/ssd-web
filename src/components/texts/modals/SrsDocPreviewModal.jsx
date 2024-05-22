import React, { useState, useEffect } from "react";
import { Box, Dialog, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { selectCurrentUploadDetail } from "../../../features/upload/uploadSlice";
import { useSelector } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const SrsDocPreviewModal = ({
  openSrsDocPreviewModal,
  closeSrsDocPreviewModal,
}) => {
  const fileUpload = useSelector(selectCurrentUploadDetail);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const handleClose = async () => {
    closeSrsDocPreviewModal();
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={openSrsDocPreviewModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          p: 4,
          height: "80%",
        }}
      >
        <Box sx={{ position: "absolute", top: 5, right: 5 }}>
          {" "}
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 3, bgcolor: "background.paper" }}>
          {fileUpload.document && (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={fileUpload.document}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default SrsDocPreviewModal;
