import React from "react";
import PropTypes from "prop-types";
import { Divider, Paper, Stack } from "@mui/material";
import { Content, Title } from "../../elements";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

function Cards({ children, Icon, title, empty, action }) {
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between'}}>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        {Icon ? <Icon fontSize="large" sx={{ color: grey[500] }} /> : null}
        <Box>
          <Title variant="h5">{title}</Title>
        </Box>
      </Stack>
      {action ? action : null}
      </Stack>
      <Divider />
      {empty ? (
        <Content sx={{ fontSize: 12, padding: 5, textAlign: "center" }}>
          No item available in your {title}
        </Content>
      ) : (
        children
      )}
    </Paper>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.any,
  empty: PropTypes.bool,
  action: PropTypes.any
};

Cards.defaultProps = {
  title: "Test title",
  empty: false,
};

export default Cards;
