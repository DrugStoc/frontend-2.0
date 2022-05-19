import { Box, Container, Grid, Divider, Stack, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import {
  Button,
  Content,
  FormGroup,
  TextField,
  Title,
} from "../components/elements";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Navbar from "../components/Navbar/Navbar";
import Cards from "../components/sidebar/elements/cards";
import { getCartItems } from "../connect/shopping";
import { connect } from "react-redux";
import { useEffect } from "react";
import CartItem from "../components/cartItem";
import { priceFormat } from "../util/priceFormatter";

import React from "react";
import { shipping_address } from "../connect/shipping";
import ShippingItem from "../components/shippingItem";

export const Checkbox = (props) => {
    useEffect(() => {
        props.getShippingAddress();
        props.loadCartItem();
      }, []);
      const {
        control: control2,
        reset,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
      } = useForm({
        defaultValues: {
          email: "",
          role: "viewer",
        },
      });

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 10 }} fixed>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Cards
                title="Your shipping Addresses"
                //   empty
              >
                  <Controller
            name="role"
            control={control2}
            rules={{
              required: {
                value: true,
                message: "Please a Role is required",
              },
            }}
            render={({ field }) => (
              <FormGroup>
                  {props.address.results.map((element, index) => (
                    <RadioGroup key={index} {...field}>
                    <FormControlLabel
                      value={element.id}
                      defaultValue={element.is_default}
                      control={<Radio />}
                      label={`${element.first_name} ${element.last_name}`}
                    />
                    <Content sx={{ width: "50%" }}>
                      {`${element.address_line1} ${element.address_line2} ${element.region}`}
                    </Content>
                  <Divider />
                  </RadioGroup>
                  ))}
                
                {errors2.role && (
                  <Content
                    sx={{
                      marginTop: "8px",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    {errors2.role.message}
                  </Content>
                )}
              </FormGroup>
            )}
          />
                {/* <Grid container spacing={3} sx={{ marginTop: 2 }}>
                  {props.address.results.map((element, index) => (
                    <Grid key={index} item md={6}>
                      <ShippingItem data={element} />
                    </Grid>
                  ))}
                </Grid> */}
              </Cards>
              <Box sx={{height: 30}} />
              <Cards
                title={`Cart Information (${props.cartList.count} Items)`}
                empty={props.cartList.results == 0}
              >
                {props.cartList.results.map((element, i) => (
                  <CartItem key={i} data={element} />
                ))}
              </Cards>
            </Grid>
            <Grid item xs={12} md={4}>
              <Cards title="Summary">
                <Stack
                  direction="row"
                  sx={{ marginTop: 2 }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Content>Subtotal</Content>
                  <Title variant="h6">{priceFormat(5000000.0)}</Title>
                </Stack>
                <Content sx={{ fontSize: 12 }}>
                  Delivery fees not included yet.
                </Content>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Button variant="contained">Continue to Payment</Button>
              </Cards>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

Checkbox.propTypes = {};

const mapStateToProps = (state) => {
  return {
    cartList: state.shopping.cart,
    address: state.shipping.shipping,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItem: () => dispatch(getCartItems()),
    getShippingAddress: () => dispatch(shipping_address()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
