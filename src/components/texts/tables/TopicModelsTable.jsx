import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setModelId,
  setProcessingId,
  setDocName,
} from "../../../features/processing/textProcessingSlice.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomDataGrid from "../../common/utils/CustomDataGrid.jsx";
import { Box, Typography, Button } from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { red, green } from "@mui/material/colors";
import PreviewIcon from "@mui/icons-material/Preview";
import CancelIcon from "@mui/icons-material/Cancel";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import TopicIcon from "@mui/icons-material/Topic";
import RunAnalysisDialog from "../modals/RunAnalysisDialog.jsx";

const TopicModelsTable = ({ modelData, type }) => {
  const [openRunAnalysisModal, setOpenRunAnalysisModal] = useState(false);
  const [processType, setProcessType] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const closeRunAnalysisModal = () => {
    setOpenRunAnalysisModal(false);
  };
  const handleProcessClick = (params) => {
    dispatch(setModelId({ modelId: params.row.id }));
    dispatch(setProcessingId({ processingId: params.row.text_processing_id }));
    dispatch(setDocName({ docName: params.row.document_name }));

    setOpenRunAnalysisModal(true);
  };
  const handleViewClick = (params) => {
    dispatch(setModelId({ modelId: params.row.id }));
    dispatch(setProcessingId({ processingId: params.row.text_processing_id }));
    dispatch(setDocName({ docName: params.row.document_name }));

    navigate(`/user/${processType}-analysis/results`)
  };

  function statusMark(paramValue) {
    if (paramValue === true) {
      return <CheckCircleOutlineIcon color="success" />;
    } else {
      return <CancelIcon color="error" />;
    }
  }
  const ActionButton = (params) => {
    if (
      params.row.lda_topics_file_path === true ||
      params.row.lsa_topics_file_path === true
    ) {
      if (params.row.action === "process") {
        return (
          <Button
            variant="outlined"
            onClick={() => handleProcessClick(params)}
            startIcon={
              <TopicIcon
                sx={{
                  color: `primary.main`,
                  mr: 1,
                  fontSize: "medium",
                }}
              />
            }
          >
            Run Analysis
          </Button>
        );
      } else {
        return (
          <Button
            variant="outlined"
            onClick={() => handleViewClick(params)}
            startIcon={
              <PreviewIcon
                sx={{
                  color: `primary.main`,
                  mr: 1,
                  fontSize: "medium",
                }}
              />
            }
          >
            View Results
          </Button>
        );
      }
    } else {
      return (
        <Button
          variant="outlined"
          disabled
          startIcon={
            <DoNotDisturbAltIcon
              sx={{
                color: `error`,
                mr: 1,
                fontSize: "medium",
              }}
            />
          }
        >
          No Actions
        </Button>
      );
    }
  };

  function getChipProps(params) {
    if (params.row.lda_topics_file_path === true) {
      return {
        label: "READY",
        style: {
          width: "200px",
          color: green[600],
          borderColor: green[100],
          backgroundColor: green[100],
          borderRadius: 5,
        },
      };
    } else if (params.row.lsa_topics_file_path === true) {
      return {
        label: "READY",
        style: {
          width: "200px",
          color: green[600],
          borderColor: green[100],
          backgroundColor: green[100],
          borderRadius: 5,
        },
      };
    } else {
      return {
        label: "ABANDONED",
        style: {
          width: "150px",
          color: red[600],
          borderColor: red[100],
          backgroundColor: red[100],
          borderRadius: 5,
        },
      };
    }
  }

  const columns = [
    {
      field: "document_name",
      headerName: "SRS Doc",
      width: 200,
    },
    {
      field: "coherence_value",
      headerName: "Coherence",
      width: 200,
    },
    {
      field: "selected_topics",
      headerName: "Coherent Topics",
      width: 150,
    },

    {
      field: `${type}_topics_file_path`,
      headerName: "Topics  Path",
      width: 100,
      renderCell: (params) => {
        return statusMark(params.value);
      },
    },
    {
      field: "time_created",
      headerName: "Date Processed",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.time_created).format("DD-MM-YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip variant="outlined" size="medium" {...getChipProps(params)} />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return ActionButton(params);
      },
    },
  ];
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const processTypeSegment = pathSegments[2];
    if (processTypeSegment === 'lda-analysis') {
      setProcessType('lda');
    } else {
      setProcessType('lsa');
    }
  }, [location]);
  return (
    <>
      <RunAnalysisDialog
        openRunAnalysisModal={openRunAnalysisModal}
        closeRunAnalysisModal={closeRunAnalysisModal}
        processType={processType}
      />
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
          marginRight: 2,
        }}
      >
        {<CustomDataGrid rows={modelData} columns={columns} />}
      </Box>
    </>
  );
};

export default TopicModelsTable;
