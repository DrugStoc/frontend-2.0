import { Box, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Ads = (props) => {
  return (
    <Paper  elevation={0}>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: 230,
          objectFit: "cover"
        }}
        alt="ads image"
        src={props.image}
      />
    </Paper>
  );
};

Ads.propTypes = {
  second: PropTypes.third,
  image: PropTypes.string
};

Ads.defaultProps = {
    image: "/no_image.png"
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
