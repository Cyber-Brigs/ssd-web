import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { getTopicModels } from "../../api/processing/textProcessing.js";
import MemoryIcon from "@mui/icons-material/Memory";
import TopicModelsTable from "./tables/TopicModelsTable.jsx";

const SimilarityResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [modelData, setTextData] = useState([]);
  const [page, setPage] = useState("lda");
  const [pageObject, setPageObject] = useState({
    type: "lda",
    text: "LDA",
    description: "Linear Dirichlet Allocation",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const processTypeSegment = pathSegments[2];
    if (processTypeSegment === "lda-analysis") {
      setPage("lda");
    } else {
      setPage("lsa");
    }
  }, [location]);

  const fetchTopicModels = () => {
    getTopicModels(page).then((res) => {
      setTextData(res.data);
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
      setPageObject({
        type: "lda",
        text: "LDA",
        description: "Linear Dirichlet Allocation",
      });
    }
  };

  useEffect(() => {
    pageData(page);
    fetchTopicModels();
  }, [page, location]);
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
              {pageObject.text} Results
            </Typography>
          }
          subheader={
            <Typography sx={{ color: "black" }}>
              <HelpOutlineIcon color="primary" /> Before {pageObject.text}{" "}
              result processing, topic modelling on a specification document
              must be completed. From the Topic Modelling page, click on
              "Actions" then "Run {pageObject.text} Model" and follow the
              prompts.
            </Typography>
          }
          action={
            <Button
              variant="outlined"
              sx={{ borderRadius: 2, bgcolor: "primary" }}
              startIcon={<MemoryIcon />}
              onClick={() => navigate("/user/preprocessing")}
            >
              Go To Models
            </Button>
          }
        />
        <CardContent sx={{ p: "-2" }}>
          <Typography variant="h6" color="grey" fontWeight="500">
            {pageObject.text} Topic Models
          </Typography>
          {loading && <LinearProgress />}
          {!loading ? (
            modelData.length > 0 ? (
              <Box sx={{ overflowX: "auto" }}>
                <TopicModelsTable modelData={modelData} type={page} />
              </Box>
            ) : (
              <Typography sx={{ color: "black" }}>
                There are No {pageObject.text} Topic Models yet. To get started,
                click "GO TO MODELS".
              </Typography>
            )
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SimilarityResultsPage;
