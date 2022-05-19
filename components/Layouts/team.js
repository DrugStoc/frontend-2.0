import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Grid, Link, Stack } from "@mui/material";
import AccountLayout from "./account";
import { Button, Content, Title } from "../elements";
import TabItem from "../sidebar/elements/tabitem";

function BusinessLayout({ children }) {
  return (
    <AccountLayout>
      <Box sx={{ marginBottom: 5 }}>
        <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}> Business Info </Title>
        <Content>Let’s get you started with DrugStoc</Content>
      </Box>
      <Stack direction="row" spacing={2}>
      <TabItem name="Business Info" href="/account/business" />
      <TabItem name="Team Members" href="/account/team" />
      </Stack>
      <Box sx={{marginTop: 3}}>{children}</Box>
    </AccountLayout>
  );
}

BusinessLayout.propTypes = {};

export default BusinessLayout;
