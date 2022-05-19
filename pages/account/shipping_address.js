import { Add, Edit } from "@mui/icons-material";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Content, Title } from "../../components/elements";
import { Delete } from "../../components/icons";
import AccountLayout from "../../components/Layouts/account";
import ShippingItem from "../../components/shippingItem";
import Cards from "../../components/sidebar/elements/cards";
import { shipping_address } from "../../connect/shipping";

function ShippingAddress(props) {
  useEffect(() => {
    props.getShippingAddress();
  }, []);
  return (
    <AccountLayout>
      <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
        Shipping Address
      </Title>
      <Content>Let’s get you started with DrugStoc</Content>
      <Box sx={{ marginTop: 5 }}>
        <Cards
          title="Your shipping Addresses"
          action={
            <Button
              disableElevation
              variant="contained"
              sx={{ height: 40 }}
              startIcon={<Add />}
            >
              Add New Address
            </Button>
          }
          //   empty
        >
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {props.address.results.map((element, index) => (
              <Grid key={index} item md={6}>
                <ShippingItem data={element} />
              </Grid>
            ))}
          </Grid>
        </Cards>
      </Box>
    </AccountLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    address: state.shipping.shipping,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShippingAddress: () => dispatch(shipping_address()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
