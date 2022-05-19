import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Stack } from "@mui/material";
import { Content, Title } from "../elements";
import { priceFormat } from "../../util/priceFormatter";
import { Add, Remove } from "@mui/icons-material";
import { AddToCartButton, IconButton } from "./styles";
import { Delete } from "../icons";
import { connect } from "react-redux";
import {
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../../connect/shopping";

function CartItem(props) {
  const [loading_decrease, setLoadingDecrease] = useState(false);
  const [loading_increase, setLoadingIncrease] = useState(false);
  const [loading_delete, setLoadingDelete] = useState(false);

  function increase_item() {
    setLoadingIncrease(true);
    let data = {
      quantity: props.data.quantity + 1,
      product_id: props.data.product.id,
    };
    props.updateItemInCart(data, props.data.product.id).then((resp) => {
      if (resp.success) {
        props.loadCartItem();
        setLoadingIncrease(false);
      } else {
        setLoadingIncrease(false);
      }
    });
  }

  function decrease_item() {
    setLoadingDecrease(true);
    let data = {
      quantity: props.data.quantity - 1,
      product_id: props.data.product.id,
    };
    if (props.data.quantity == 1) {
      props.deleteItemInCart(props.data.product.id).then((resp) => {
        if (resp.success) {
          props.loadCartItem();
          setLoadingDecrease(false);
        } else {
          setLoadingDecrease(false);
        }
      });
    } else {
      props.updateItemInCart(data, props.data.product.id).then((resp) => {
        if (resp.success) {
          props.loadCartItem();
          setLoadingDecrease(false);
        } else {
          setLoadingDecrease(false);
        }
      });
    }
  }

  function delete_item() {
    setLoadingDelete(true)
    props.deleteItemInCart(props.data.product.id).then((resp) => {
      if (resp.success) {
        props.loadCartItem();
        setLoadingDelete(false);
      } else {
        setLoadingDelete(false);
      }
    });
  }

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction="row"
          sx={{ alignContent: "center" }}
          width="70%"
          spacing={3}
        >
          <Box
            component="img"
            loading="lazy"
            sx={{
              width: 100,
              height: 100,
              objectFit: "contain",
            }}
            alt="product image"
            src={props.data.product.image}
          />
          <Box>
            <Content
              sx={{
                fontSize: 14,
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontWeight: "600",
                color: "#000",
                whiteSpace: "nowrap",
              }}
            >
              {props.data.product.name}
            </Content>
            <Content
              sx={{
                fontSize: 12,
                textOverflow: "ellipsis",
              }}
            >
              {props.data.product.desc}
            </Content>
          </Box>
        </Stack>
        <Box sx={{ alignContent: "center" }}>
          <Title variant="h6" sx={{ textAlign: "right" }}>
            {priceFormat(props.data.product.price * props.data.quantity)}
          </Title>
          <Content sx={{ textAlign: "right", fontSize: 12 }}>
            {priceFormat(props.data.product.price)} x {props.data.quantity}{" "}
            item(s)
          </Content>
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{ marginTop: 1 }}
        justifyContent="space-between"
      >
        <AddToCartButton onClick={delete_item} loading={loading_delete} startIcon={<Delete />} color="error" disableElevation>
          Remove this Item
        </AddToCartButton>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="18%"
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
          <Title variant="p">{props.data.quantity}</Title>
          <IconButton
            onClick={increase_item}
            loading={loading_increase}
            disableElevation
            variant="contained"
          >
            <Add />
          </IconButton>
        </Stack>
      </Stack>
      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );
}

const mapsDispatchToProps = (dispatch) => {
  return {
    updateItemInCart: (data, id) => dispatch(updateCartItem(data, id)),
    deleteItemInCart: (id) => dispatch(deleteCartItem(id)),
    loadCartItem: () => dispatch(getCartItems()),
  };
};

export default connect(null, mapsDispatchToProps)(CartItem);
