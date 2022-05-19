import { Add, Remove } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Content, Title } from "../../components/elements";
import Navbar from "../../components/Navbar/Navbar";
import { AddToCartButton, IconButton } from "../../components/product/styles";
import Connect from "../../util/connect";
import { priceFormat } from "../../util/priceFormatter";
import { BASE_URL } from "../../util/resolveerror";

export const ProductsDetails = (props) => {
  const [quantity, setQuantity] = useState(props.data.quantity_in_cart || 1);
  const [loading_decrease, setLoadingDecrease] = useState(false);
  const [loading_increase, setLoadingIncrease] = useState(false);

  function increase_item() {
    setQuantity((quantity += 1));
    // setLoadingIncrease(true)
    // let data = {
    //   "quantity": quantity+1,
    //   "product_id": props.id
    // }
    // props.updateItemInCart(data, props.id).then(resp => {
    //   if (resp.success) {
    //     setQuantity(quantity+=1)
    //     setLoadingIncrease(false)
    //   } else {
    //     setLoadingIncrease(false)
    //   }
    // })
  }

  function decrease_item() {
    setQuantity((quantity -= 1));
    // setLoadingDecrease(true)
    // let data = {
    //   "quantity": quantity-1,
    //   "product_id": props.id
    // }
    // if (quantity == 1) {
    //   props.deleteItemInCart(props.id).then(resp => {
    //     if (resp.success) {
    //       setQuantity(1)
    //       setLoadingDecrease(false)
    //       setLoadingCart(false);
    //       setCart(false);
    //     } else {
    //       setLoadingDecrease(false)
    //     }
    //   })
    // } else {
    //   props.updateItemInCart(data, props.id).then(resp => {
    //     if (resp.success) {
    //       setQuantity(quantity-=1)
    //       setLoadingDecrease(false)
    //     } else {
    //       setLoadingDecrease(false)
    //     }
    //   })
    // }
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ marginTop: 3 }}>
        <Container fixed>
          {props.data ? (
            <>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Box
                    component="img"
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: 430,
                      cursor: "pointer",
                      objectFit: "contain",
                    }}
                    alt="product image"
                    src={props.data.image}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Title
                    variant="h4"
                    sx={{
                      lineHeight: 1.4,
                    }}
                  >
                    {props.data.name}
                  </Title>
                  <Content
                    sx={{
                      fontSize: 12,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Title>SKU: {props.data.SKU}</Title>
                  </Content>
                  <Content
                    sx={{
                      fontSize: 12,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Title>MANUFACTURER: {props.data.manufacturer}</Title>
                  </Content>
                  <Content
                    sx={{
                      fontSize: 12,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    DESCRIPTION: {props.data.desc}
                  </Content>
                  <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
                  <Title
                    variant="h5"
                    sx={{
                      filter: props.data.price ? "blur(0px)" : "blur(5px)",
                    }}
                  >
                    {props.data.price
                      ? priceFormat(props.data.price)
                      : "PRICE NOT AVAILABLE"}
                  </Title>
                  <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="40%"
                    spacing={3}
                  >
                    <IconButton
                      onClick={decrease_item}
                      loading={loading_decrease}
                      disableElevation
                      variant="contained"
                    >
                      <Remove />
                    </IconButton>
                    <Title>{quantity}</Title>
                    <IconButton
                      onClick={increase_item}
                      loading={loading_increase}
                      disableElevation
                      variant="contained"
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
                  <AddToCartButton
                    variant="contained"
                    // onClick={add_to_cart}
                    // loading={loading_cart}
                    sx={{ width: "100%", fontSize: 12, fontWeight: "900" }}
                    disableElevation
                  >
                    Add to cart
                  </AddToCartButton>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
              <Title
                variant="h6"
                sx={{
                  lineHeight: 1.4,
                }}
              >
                ALTERNATIVE PRODUCTS
              </Title>
            </>
          ) : null}
        </Container>
      </Box>
    </div>
  );
};

ProductsDetails.propTypes = {};

ProductsDetails.getInitialProps = async (ctx) => {
  const api = new Connect(BASE_URL);
  const data = await api.getData({
    path: `/inventory/products/${ctx.query.productsSlug}`,
  });
  console.log(data.data);
  return { data: data.data };
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
