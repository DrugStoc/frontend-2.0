import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const CategoryDetails = (props) => {
  return <div>CategoryDetails</div>;
};

CategoryDetails.propTypes = {
  second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
