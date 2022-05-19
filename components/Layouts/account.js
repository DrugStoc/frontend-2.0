import { Box, Breadcrumbs, Container, Grid, Link } from "@mui/material";
import React from "react";
import { Content } from "../elements";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sidebar";

function AccountLayout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container sx={{ marginTop: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            underline="none"
            sx={{ cursor: "pointer" }}
            href="/account"
          >
            My account
          </Link>
          <Content sx={{fontWeight: "500", color: "#000"}}>Home</Content>
        </Breadcrumbs>
        <Grid sx={{marginTop: 5}} container spacing={5}>
          <Grid item xs={3} sx={{ borderRight: "1px solid #d7d7d7", display: { xs: "none", md: "block" }  }}>
            <SideBar />
          </Grid>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AccountLayout;
