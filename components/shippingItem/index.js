import React from "react";
import PropTypes from "prop-types";
import Cards from "../sidebar/elements/cards";
import { Box, Button, colors, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Content } from "../elements";

function ShippingItem(props) {
  return (
    <Cards
      title=""
      action={
        <Stack direction="row" sx={{ marginBottom: 1 }} spacing={2}>
          <Button variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
          <Button variant="outlined" startIcon={<Delete />} color="error">
            Delete
          </Button>
        </Stack>
      }
    >
      <Content sx={{ marginTop: 2 }}>
        {props.data.first_name} {props.data.last_name}
      </Content>
      <Content sx={{ marginTop: 1, fontSize: 12 }}>
        {props.data.address_line1} {props.data.address_line2}{" "}
        {props.data.region}
      </Content>
      <Stack direction="row" sx={{marginTop: 1}} justifyContent="space-between">
        <Box>
          <Content sx={{fontSize: 12 }}>
            {props.data.phone_number1}
          </Content>
          <Content sx={{ fontSize: 12 }}>{props.data.phone_number2}</Content>
        </Box>
        <Content sx={{ fontSize: 12, color: "green", fontWeight: "500" }}>
          {props.data.is_default ? "Default Address" : ""}
        </Content>
      </Stack>
    </Cards>
  );
}

ShippingItem.propTypes = {};

export default ShippingItem;
