import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Sliders = (props) => {
  return (
    <Paper elevation={0}>
      <Carousel
        sx={{
          width: "100%",
        }}
      >
        {props.data.map((item, i) => (
          <Box
            key={i}
            component="img"
            loading="lazy"
            sx={{
              width: "100%",
              height: 500,
              objectFit: "cover",
            }}
            alt="ads image"
            src={item}
          />
        ))}
      </Carousel>
    </Paper>
  );
};

Sliders.propTypes = {
};

Sliders.defaultProps = {
  image: "/BANNER SLIDER3.jpg",
  data: ["/BANNER SLIDER1.jpg", "/BANNER SLIDER2.jpg", "/BANNERSLIDER4.jpeg"]
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sliders);
