import React from "react";
import { Grid, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ marginTop: "auto" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="bg-[#2e4161] p-2"
      >
        <Grid item xs={12} md={3}>
          <img
            src="https://www.nrf.go.ke/wp-content/uploads/2023/06/NRF-LOGO-LOCKUP-Site-Icon.png"
            alt="Logo"
            style={{ maxWidth: "200px", width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" align="center" className="text-white">
            © Copyright {currentYear}, All Rights Reserved
          </Typography>
          <Typography variant="body2" align="center" className="text-white">
            Privacy Policy Terms & Conditions
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Link
              href="https://www.facebook.com/nrfkenya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 cursor-pointer transition"
            >
              <FacebookIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.linkedin.com/company/national-research-fund-kenya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 cursor-pointer transition"
            >
              <LinkedInIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://twitter.com/nrfkenya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 cursor-pointer transition"
            >
              <TwitterIcon />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.youtube.com/@nationalresearchfundkenya8036"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-500 cursor-pointer transition"
            >
              <YouTubeIcon />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;