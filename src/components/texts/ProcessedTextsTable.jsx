import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTextProcessingDetail } from "../../features/processing/textProcessingSlice.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomDataGrid from "../common/utils/CustomDataGrid.jsx";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { red, green, orange } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import TranslateIcon from "@mui/icons-material/Translate";
import TopicIcon from '@mui/icons-material/Topic';
import RunAnalysisDialog from "./modals/RunAnalysisDialog.jsx";

const ProcessedTextsTable = ({ textData }) => {
  const [openRunAnalysisModal, setOpenRunAnalysisModal] = useState(false);
  const [rowParams, setRowParams] = useState({});
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [processType, setProcessType] = useState("");
  const dispatch = useDispatch();
  const handleProcessingActionsClick = (params) => (event) => {
    setRowParams(params.row);
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };
  const closeRunAnalysisModal = () => {
    setOpenRunAnalysisModal(false);
  };
  const handleMenuItemClick = (prop) => {
    handleCloseMenu();
    dispatch(
      setCurrentTextProcessingDetail({ currentTextProcessingDetail: rowParams })
    );
    if (prop === "Run LDA Model") {
      setOpenRunAnalysisModal(true);
      setProcessType("lda");
    } else {
      setOpenRunAnalysisModal(true);
      setProcessType("lsa");
    }
  };

  function statusMark(paramValue) {
    if (paramValue === true) {
      return <CheckCircleOutlineIcon color="success" />;
    } else {
      return <CancelIcon color="error" />;
    }
  }
  function getChipProps(params) {
    if (params.value === "ready") {
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
    } else if (params.value === "pending") {
      return {
        label: "PENDING",
        style: {
          width: "200px",
          color: orange[600],
          borderColor: orange[100],
          backgroundColor: orange[100],
          borderRadius: 5,
        },
      };
    } else {
      return {
        label: "ERROR",
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
      width: 150,
    },
    {
      field: "start_page",
      headerName: "First Page",
      width: 100,
    },
    {
      field: "end_page",
      headerName: "Last Page",
      width: 100,
    },
    {
      field: "processed_text_file",
      headerName: "Cleaned Text",
      width: 150,
      renderCell: (params) => {
        return statusMark(params.value);
      },
    },
    {
      field: "corpus_file",
      headerName: "Corpus",
      width: 100,
      renderCell: (params) => {
        return statusMark(params.value);
      },
    },
    {
      field: "dictionary_file",
      headerName: "Dictionary",
      width: 100,
      renderCell: (params) => {
        return statusMark(params.value);
      },
    },
    {
      field: "date_created",
      headerName: "Date Processed",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.date_created).format("DD-MM-YYYY")}
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
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={handleProcessingActionsClick(params)}>
              <MoreVertIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <RunAnalysisDialog
        openRunAnalysisModal={openRunAnalysisModal}
        closeRunAnalysisModal={closeRunAnalysisModal}
        processType={processType}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleMenuItemClick("Run LDA Model")}>
          <Box display="flex" alignItems="center" textAlign="center">
            <TopicIcon
              sx={{
                color: `primary.main`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Run LDA Model
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Run LsA Model")}>
          <Box display="flex" alignItems="center" textAlign="center">
            <TranslateIcon
              sx={{
                color: `primary.main`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Run LSA Model
          </Box>
        </MenuItem>
      </Menu>
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
          marginRight: 2,
        }}
      >
        {<CustomDataGrid rows={textData} columns={columns} />}
      </Box>
    </>
  );
};

export default ProcessedTextsTable;
