import { Box, Container, Grid, Divider, Stack } from "@mui/material";
import {
  Button,
  Content,
  FormGroup,
  TextField,
  Title,
} from "../components/elements";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";
import Cards from "../components/sidebar/elements/cards";
import { getCartItems } from "../connect/shopping";
import { connect } from "react-redux";
import { useEffect } from "react";
import CartItem from "../components/cartItem";
import { priceFormat } from "../util/priceFormatter";

function Cart(props) {
  useEffect(() => {
    props.loadCartItem();
  }, []);

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 10 }} fixed>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Cards
                title={`Cart (${props.cartList.count} Items)`}
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
                <Button variant="contained" href="/checkout">Checkout</Button>
              </Cards>
              <Box sx={{ marginTop: 5 }}></Box>
              <Cards sx={{ marginTop: 12 }} title="Returns are easy">
                <Content sx={{ fontSize: 12, marginTop: 2 }}>
                  Free return within 15 days for Official Store items and 7 days
                  for other eligible items
                </Content>
              </Cards>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

Cart.propTypes = {};

const mapStateToProps = (state) => {
  return {
    cartList: state.shopping.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItem: () => dispatch(getCartItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
