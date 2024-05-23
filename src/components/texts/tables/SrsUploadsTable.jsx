import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUploadDetail } from "../../../features/upload/uploadSlice.js";
import CustomDataGrid from "../../common/utils/CustomDataGrid.jsx";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { red, green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageviewIcon from "@mui/icons-material/Pageview";
import MemoryIcon from "@mui/icons-material/Memory";
import SrsDocPreviewModal from "../modals/SrsDocPreviewModal.jsx";
import SrsProcessModal from "../modals/SrsProcessModal.jsx";
const SrsUploadsTable = ({ fileData }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [rowParams, setRowParams] = useState({});
  const [openSrsDocPreviewModal, setOpenSrsDocPreviewModal] = useState(false);
  const [openSrsProcessModal, setOpenSrsProcessModal] = useState(false);
  const dispatch = useDispatch();
  const handleUploadActionsClick = (params) => (event) => {
    setRowParams(params.row);
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };
  const closeSrsDocPreviewModal = () => {
    setOpenSrsDocPreviewModal(false);
  };
  const closeSrsProcessModal = () => {
    setOpenSrsProcessModal(false);
  };
  const handleMenuItemClick = (prop) => {
    handleCloseMenu();
    dispatch(setCurrentUploadDetail({ currentUploadDetail: rowParams }));
    if (prop === "view") {
      setOpenSrsDocPreviewModal(true);
    } else {
      setOpenSrsProcessModal(true);
    }
  };
  function getChipProps(params) {
    if (params.value === "available") {
      return {
        label: "AVAILABLE",
        style: {
          width: "150px",
          color: green[600],
          borderColor: green[100],
          backgroundColor: green[100],
          borderRadius: 5,
        },
      };
    } else {
      return {
        label: "UNAVAILABLE",
        style: {
          width: "200px",
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
      headerName: "Document Name",
      width: 450,
    },
    {
      field: "date_created",
      headerName: "Upload Date",
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
      width: 250,
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
            <IconButton onClick={handleUploadActionsClick(params)}>
              <MoreVertIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <SrsDocPreviewModal
        openSrsDocPreviewModal={openSrsDocPreviewModal}
        closeSrsDocPreviewModal={closeSrsDocPreviewModal}
      />
      <SrsProcessModal
        openSrsProcessModal={openSrsProcessModal}
        closeSrsProcessModal={closeSrsProcessModal}
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
        <MenuItem onClick={() => handleMenuItemClick("view")}>
          <Box display="flex" alignItems="center" textAlign="center">
            <PageviewIcon
              sx={{
                color: `primary.main`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Preview
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("process")}>
          <Box display="flex" alignItems="center" textAlign="center">
            <MemoryIcon
              sx={{
                color: `primary.main`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Preprocess
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
          //   padding: 2,
        }}
      >
        <CustomDataGrid rows={fileData} columns={columns} />
      </Box>
    </>
  );
};

export default SrsUploadsTable;
