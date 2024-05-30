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
    <div className="bg-[#F5F5F5] py-3 right-side min-h-screen min-w-full ">
      <div className="ml-[250px] mt-[65px]">
        <DashView data={pageObject.description} />
        <Card >
          <CardHeader
            title={
              <Typography variant="h6" color="black" fontWeight="500">
                {pageObject.text} Results
              </Typography>
            }
            subheader={
              <IconButton
                color="primary"
                aria-label="upload file"
                component="label"
              >
                <Typography sx={{ color: "black" }}>
                  <HelpOutlineIcon color="primary" /> Before {pageObject.text}{" "}
                  result processing, topic modelling on a specification document
                  must be completed. From the Topic Modelling page, click on
                  "Actions" then "Run {pageObject.text} Model" and follow the
                  prompts.
                </Typography>
              </IconButton>
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
                <TopicModelsTable modelData={modelData} type={page} />
              ) : (
                <Typography sx={{ color: "black" }}>
                  There are No {pageObject.text} Topic Models yet. To get
                  started, click "GO TO MODELS".
                </Typography>
              )
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimilarityResultsPage;
