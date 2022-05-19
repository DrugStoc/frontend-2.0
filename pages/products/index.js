import { Container, Divider, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Title } from "../../components/elements";
import ProductsListLayout from "../../components/Layouts/product";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/product";
import { products } from "../../data/products";

export const ProductList = (props) => {
  return (
    <ProductsListLayout>
      <Grid sx={{ marginTop: 1 }} container spacing={3}>
        {products.map((element, index) => (
          <Grid item xs={12} md={3}>
            <Products
              key={index}
              title={element.name}
              image={element.image}
              composition={element.composition}
            />
          </Grid>
        ))}
      </Grid>
    </ProductsListLayout>
  );
};

ProductList.propTypes = {
  second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
