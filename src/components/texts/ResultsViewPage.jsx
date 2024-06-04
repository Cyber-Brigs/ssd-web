import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectModelId } from "../../features/processing/textProcessingSlice.js";
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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DashView from "../users/DashView.jsx";
import { fetchProcessingResults } from "../../api/processing/textProcessing.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CapecCard from "./cards/CapecCard.jsx";

const ResultsViewPage = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const [resultsData, setResultsData] = useState([]);
  const [pageObject, setPageObject] = useState({
    type: "lda",
    text: "LDA",
    description: "Linear Dirichlet Allocation",
  });
  const navigate = useNavigate();
  const instance_id = useSelector(selectModelId);
  const fetchInstanceResults = () => {
    fetchProcessingResults(page, instance_id).then((res) => {
      setResultsData(res.data.results);
      setLoading(false);
    });
  };

  const pageData = (page) => {
    if (page === "lsa") {
      setPageObject({
        type: "lsa",
        text: "LSA",
        description: "Latent Semantic Analysis",
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    pageData(page);
    fetchInstanceResults();
  }, [page]);

  return (
    <Box
      sx={{
        mt: { xs: 12, sm: 12, md: 3 },
        mx: 3,
      }}
    >
      <Card
        sx={{
          width: { xs: "100vw", sm: "95vw", md: "82vw" },
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" color="black" fontWeight="500">
              {pageObject.text} Results View
            </Typography>
          }
          subheader={
            <Typography sx={{ color: "black" }}>
              <HelpOutlineIcon color="primary" /> Top 10 attack patterns based
              on {pageObject.text} analysis are displayed here. Typically,
              patterns identified to have coherence values greater than 40% are
              termed critical and require actions. It is adviced to rewrite the
              SRS doc or ensure a mitigation report is prepared beforehand.
            </Typography>
          }
          action={
            <Button
              variant="outlined"
              sx={{ borderRadius: 2, bgcolor: "primary" }}
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(`/user/${page}-analysis`)}
            >
              Go Back
            </Button>
          }
        />
        <CardContent sx={{ p: "-2" }}>
          {loading && <LinearProgress />}
          {!loading ? (
            resultsData.length > 0 ? (
              <CapecCard resultsData={resultsData} />
            ) : (
              <Typography sx={{ color: "black" }}>
                There are No {pageObject.text} Results for this Models yet. To
                get started, click "GO BACK" and run results processing.
              </Typography>
            )
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultsViewPage;
