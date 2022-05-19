import { Container, Divider, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Title } from "../components/elements";
import ProductsListLayout from "../components/Layouts/product";
import Navbar from "../components/Navbar/Navbar";
import Products from "../components/product";
import { category_products } from "../connect/products";
import { products } from "../data/products";

export const SearchPage = (props) => {
//   useEffect(() => {
//     props.getCategoryProduct(props.query);
//   }, []);
  return (
    <ProductsListLayout>
      {props.productsResult ? (
        <Grid sx={{ marginTop: 1 }} container spacing={3}>
          {props.productsResult.results.map((element, index) => (
            <Grid item xs={12} md={3}>
              <Products
                key={element.id}
                id={element.id}
                title={element.name}
                image={element.image}
                description={element.desc}
                price={element.price}
                slug={element.slug}
                sku={element.SKU}
                quantity_in_cart={element.quantity_in_cart}
                in_cart={element.in_cart}
                quantity={element.quantity}
                category={element.category}
                manufacturer={element.manufacturer}
                composition={element.composition}
              />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </ProductsListLayout>
  );
};

SearchPage.propTypes = {
  //   second: PropTypes.third,
};

SearchPage.getInitialProps = ({ query }) => {
  return { query: query.categorySlug };
};

const mapStateToProps = (state) => {
  return {
    productsResult: state.products.search_result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCategoryProduct: (slug) => dispatch(category_products(slug)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
