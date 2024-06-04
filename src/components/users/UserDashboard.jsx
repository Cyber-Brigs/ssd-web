import React, { useEffect, useState } from "react";
import MetricCard from "./cards/MetricCard.jsx";
import { Box, Grid } from "@mui/material";
import { getUserPlatformStats } from "../../api/statistics/userStats";
import SrsUploadsChart from "./SrsUploadsChart";
import TranslateIcon from "@mui/icons-material/Translate";
import TopicIcon from "@mui/icons-material/Topic";
import MemoryIcon from "@mui/icons-material/Memory";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningIcon from "@mui/icons-material/Warning";

const UserDashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getUserPlatformStats().then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="dashcomp">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{ m: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={<DriveFolderUploadIcon sx={{ color: "primary.main" }} />}
              text={"Total Uploads"}
              number={stats.total_uploads}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={<MemoryIcon sx={{ color: "primary.main" }} />}
              text={"Preprocessed Docs"}
              number={stats.preprocessed_srs_docs}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={<TopicIcon sx={{ color: "primary.main" }} />}
              text={"LDA Analysis"}
              number={stats.lda_entries}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              icon={<TranslateIcon sx={{ color: "primary.main" }} />}
              text={"LSA Analysis"}
              number={stats.lsa_entries}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ m: 1 }}>
          <Grid item xs={12} sm={6} md={6}>
            <MetricCard
              icon={<PendingActionsIcon sx={{ color: "primary.main" }} />}
              text={"Pending Actions"}
              number={stats.pending_entries}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <MetricCard
              icon={<WarningIcon sx={{ color: "error.main" }} />}
              text={"Critical Vulnerabilities"}
              number={stats.critical_vulnerabilities}
            />
          </Grid>
        </Grid>
        <div className="invoiceTable">
          <Grid container sx={{ m: 1 }}>
            <Grid item xs={12} sm={6} md={9}>
              <h1 className="text-gray-700 font-semibold text-md mb-5 mt-5 ml-5">
                SRS Document Uploads
              </h1>
              <SrsUploadsChart plotData={stats.srs_uploads} />
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default UserDashboard;
