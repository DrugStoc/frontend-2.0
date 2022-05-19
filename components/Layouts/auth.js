import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@mui/material";
import AuthSideBar from "../widgets/auth";

function AuthenticationsLayout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{display: { xs: "none", md: "flex" },background: "#f2f6fb !important", paddingTop: "56px !important",}}>
          <AuthSideBar />
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{  display: { md: "block" }, paddingTop: "56px !important", background: "#ffffff !important", height: "100vh", position: "relative", width: "100%" }}>
          <Container fixed sx={{  padding: { xs: "16px !important", md: "10px 70px 30px 30px !important",}, }}>
            {children}
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

AuthenticationsLayout.propTypes = {};

export default AuthenticationsLayout;
