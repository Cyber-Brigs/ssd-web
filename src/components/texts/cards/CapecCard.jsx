import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Card,
  CardHeader,
  Divider,
  Typography,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const CapecCard = ({ resultsData }) => {
  const AttackTitle = (id, name) => {
    return (
      <>
        <Typography
          variant="h6"
          noWrap
          sx={{ color: "error.main", fontWeight: "bold" }}
        >
          {`CAPEC-${id}: ${name}`}
        </Typography>
        <Divider />
      </>
    );
  };
  const AttackMetaData = (id, coherence) => {
    const percentage = (coherence * 100).toFixed(2);
    return (
      <>
        <Box sx={{ width: 300, marginTop: 1 }}>
          <Chip
            variant="outlined"
            color="info"
            sx={{
              height: "auto",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
            label={
              <>
                <Typography
                  sx={{ color: "black", fontWeight: "bold" }}
                >{`Attack Pattern ID: ${id}`}</Typography>
                <Typography variant="body2">{`Coherence: ${percentage}%`}</Typography>
              </>
            }
          />
        </Box>
        {/* <Divider sx={{ marginTop: 1 }} /> */}
      </>
    );
  };

  const renderExecutionFlow = (executionFlow) => {
    const steps = executionFlow
      .split("::STEP:")
      .slice(1)
      .map((step) => {
        const parts = step.split(":PHASE:");
        const title = parts[0];
        const phases = parts.slice(1).map((phase) => {
          const [phaseTitle, ...phaseDetails] = phase.split(":DESCRIPTION:");
          const description = phaseDetails.join(":DESCRIPTION:");
          const techniques = description.split("TECHNIQUE:").slice(1);
          const mainDescription = description.split("TECHNIQUE:")[0];

          return {
            phaseTitle,
            mainDescription,
            techniques,
          };
        });

        return { title, phases };
      });

    return steps.map((step, index) => (
      <div key={index}>
        {step.phases.map((phase, i) => (
          <div key={i}>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{ color: "error.main", fontWeight: "bold" }}
            >
              {phase.phaseTitle}
            </Typography>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {phase.mainDescription}
            </Typography>
            {phase.techniques.length > 0 && (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="techniques table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Techniques</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {phase.techniques.map((technique, j) => (
                      <TableRow key={j}>
                        <TableCell>{technique}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        ))}
      </div>
    ));
  };

  const renderRelatedAttackPatterns = (patterns) => {
    const patternList = patterns
      .split("::")
      .slice(1)
      .map((pattern) => {
        const parts = pattern.split(":");
        return {
          nature: parts[1].replace("NATURE:", ""),
          type: parts[2],
          id: parts[3].replace("CAPEC ID:", ""),
          name: parts[4],
        };
      });

    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="related attack patterns table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nature</b>
              </TableCell>
              <TableCell>
                <b>Type</b>
              </TableCell>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patternList.map((pattern, index) => (
              <TableRow key={index}>
                <TableCell>{pattern.nature}</TableCell>
                <TableCell>{pattern.type}</TableCell>
                <TableCell>{pattern.id}</TableCell>
                <TableCell>{pattern.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderDetailItem = (label, value) => {
    const [viewMore, setViewMore] = useState(false);
    const handleViewMoreClick = () => {
      setViewMore(!viewMore);
    };
    if (!value) return null;
    return (
      <div className="mt--8">
        <Stack
          onClick={handleViewMoreClick}
          sx={{ m: 1, p: 1 }}
          className=" bg-light-blue"
        >
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            {viewMore ? <ArrowDropUpIcon /> : <ArrowRightIcon />}
            {label}
          </Typography>
        </Stack>
        <Collapse sx={{ m: 2 }} in={viewMore} timeout="auto" unmountOnExit>
          {label === "Execution Flow" && renderExecutionFlow(value)}
          {label !== "Execution Flow" && (
            <Typography variant="body1" gutterBottom>
              {value}
            </Typography>
          )}
        </Collapse>
      </div>
    );
  };
  const renderExternalLink = (id) => {
    if (!id) return null;
    const url = `https://capec.mitre.org/data/definitions/${id}.html`;
    return (
      <Button
        sx={{ m: 1, p: 1 }}
        variant="outlined"
        color="secondary"
        onClick={() => window.open(url, "_blank")}
      >
        View more details on CAPEC Website
      </Button>
    );
  };

  return (
    <>
      {resultsData.map((data) => {
        const [expanded, setExpanded] = useState(false);
        const handleExpandClick = () => {
          setExpanded(!expanded);
        };
        return (
          <Card sx={{ margin: 2 }}>
            <CardHeader
              title={AttackTitle(data.ID, data.Name)}
              subheader={AttackMetaData(data.ID, data.coherence)}
              action={
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {Object.entries(data).map(
                ([key, value]) =>
                  key !== "ID" &&
                  key !== "Name" &&
                  key !== "Status" &&
                  key !== "coherence" &&
                  key !== "Related Attack Patterns" &&
                  key !== "Prerequisites" &&
                  key !== "Skills Required" &&
                  key !== "Resources Required" &&
                  key !== "Example Instances" &&
                  key !== "Consequences" &&
                  key !== "Related Weaknesses" &&
                  key !== "Mitigations" &&
                  key !== "Taxonomy Mappings" &&
                  key !== "Indicators" &&
                  key !== "Alternate Terms" &&
                  key !== "Notes" &&
                  renderDetailItem(key, value)
              )}
              {renderExternalLink(data.ID)}
            </Collapse>
          </Card>
        );
      })}
    </>
  );
};

export default CapecCard;
