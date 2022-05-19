import React, { useState } from "react";
import PropTypes from "prop-types";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { AddToCartButton, IconButton, ProductsContainer } from "./styles";
import { Box, Button, Checkbox, Divider, Stack } from "@mui/material";
import { Content, Title } from "../elements";
import { Add, Remove } from "@mui/icons-material";
import { addToCart, deleteCartItem, updateCartItem } from "../../connect/shopping";
import { connect } from "react-redux";
import { priceFormat } from "../../util/priceFormatter";
import Link from "next/link";

function Products(props) {
  const [quantity, setQuantity] = useState(props.quantity_in_cart);
  const [loading_decrease, setLoadingDecrease] = useState(false);
  const [loading_increase, setLoadingIncrease] = useState(false);
  const [inFav, setFav] = useState(false);
  const [inCart, setCart] = useState(props.in_cart);
  const [loading_cart, setLoadingCart] = useState(false);
  const [loading_fav, setLoadingFav] = useState(false);

  function add_to_cart() {
    let data = {
      "quantity": 1,
      "product_id": props.id
    }
    setLoadingCart(true);
    props.addItemToCart(data).then((resp) => {
      if (resp.success) {
        setLoadingCart(false);
        setCart(true);
      } else {
        setLoadingCart(false);
      }
    })
  }

  function add_to_fav() {
    setLoadingFav(true);
  }

  function increase_item() {
    setLoadingIncrease(true)
    let data = {
      "quantity": quantity+1,
      "product_id": props.id
    }
    props.updateItemInCart(data, props.id).then(resp => {
      if (resp.success) {
        setQuantity(quantity+=1)
        setLoadingIncrease(false)
      } else {
        setLoadingIncrease(false)
      }
    })
  }

  function decrease_item() {
    setLoadingDecrease(true)
    let data = {
      "quantity": quantity-1,
      "product_id": props.id
    }
    if (quantity == 1) {
      props.deleteItemInCart(props.id).then(resp => {
        if (resp.success) {
          setQuantity(1)
          setLoadingDecrease(false)
          setLoadingCart(false);
          setCart(false);
        } else {
          setLoadingDecrease(false)
        }
      })
    } else {
      props.updateItemInCart(data, props.id).then(resp => {
        if (resp.success) {
          setQuantity(quantity-=1)
          setLoadingDecrease(false)
        } else {
          setLoadingDecrease(false)
        }
      })
    }
  }

  return (
    <ProductsContainer variant="outlined">
      <Link href={`/products/${props.slug}`}>
      <Box
        component="img"
        loading="lazy"
        sx={{
          width: "100%",
          height: 230,
          cursor: "pointer",
          objectFit: "contain",
        }}
        alt="product image"
        src={props.image}
      />
      </Link>
      <Box sx={{ padding: 2 }}>
        <Content
          sx={{
            fontSize: 12,
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "#000",
            whiteSpace: "nowrap",
          }}
        >
          {props.title}
        </Content>
        <Divider sx={{ marginTop: 0.5 }} />
        <Title
          variant="h6"
          sx={{
            filter: props.price ? "blur(0px)" : "blur(5px)",
          }}
        >
          {props.price ? priceFormat(props.price) : "PRICE NOT AVAILABLE"}
        </Title>
        <Divider sx={{ marginBottom: 0.5 }} />
        <Content
          sx={{
            fontSize: 10,
            textOverflow: "ellipsis",
            overflow: "hidden",
            height: 30,
          }}
        >
          {props.description}
        </Content>
        <Stack direction="row" sx={{ marginTop: 2, height: 40 }} spacing={1}>
          {!inCart ? (
            <AddToCartButton
              variant="contained"
              disabled={props.quantity == 0}
              onClick={add_to_cart}
              loading={loading_cart}
              sx={{ width: "100%", fontSize: 12, fontWeight: "900" }}
              disableElevation
            >
             { props.quantity == 0 ? "Out of Stock" : "Add to cart"}
            </AddToCartButton>
          ) : (
            <Stack direction="row" justifyContent="space-between" width="100%" spacing={3}>
              <IconButton
                onClick={decrease_item}
                loading={loading_decrease}
                variant="contained"
              >
                <Remove />
              </IconButton>
              <Title>{quantity}</Title>
              <IconButton
                onClick={increase_item}
                loading={loading_increase}
                variant="contained"
              >
                <Add />
              </IconButton>
            </Stack>
          )}
          <IconButton
            onClick={add_to_fav}
            loading={loading_fav}
            variant="outlined"
          >
            {props.in_fav ? <Favorite /> : <FavoriteBorder />}
            {/* <Checkbox
              icon={<FavoriteBorder color="primary" />}
              checkedIcon={<Favorite />}
            /> */}
          </IconButton>
        </Stack>
      </Box>
    </ProductsContainer>
  );
}

Products.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  in_cart: PropTypes.bool.isRequired,
  quantity_in_cart: PropTypes.number.isRequired,
  in_fav: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  manufacturer: PropTypes.string,
  composition: PropTypes.array.isRequired,
};

Products.defaultProps = {
  image: "http://drugstoc.odoo.com/web/image/product.product/6079/image",
  title: "Mycoten 100mg X 6",
  composition: "Ketoconazole 10mg",
  in_cart: false,
  in_fav: false,
  quantity_in_cart: 1
};

const mapsDispatchToProps = dispatch => {
  return {
    addItemToCart: data => dispatch(addToCart(data)),
    updateItemInCart: (data, id) => dispatch(updateCartItem(data, id)),
    deleteItemInCart: (id) => dispatch(deleteCartItem(id))
  }
}

export default connect(null, mapsDispatchToProps)(Products);
