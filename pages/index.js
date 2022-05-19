import {
  Box,
  colors,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
} from "@mui/material";
import { Content, Title } from "../components/elements";
import Navbar from "../components/Navbar/Navbar";
import Product from "../components/product";
import { Button } from "@mui/material";
import Ads from "../components/widgets/ads";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Carousel from "../components/widgets/carousel";
import { products } from "../data/products";
import { products_popular } from "../connect/products";
import { connect } from "react-redux";
import { useEffect } from "react";


 function Home(props) {
   useEffect(() => { 
     props.get_popular_item();
   },[])
  return (
    <div>
      <Navbar />
      <Carousel />
      <Box sx={{ marginTop: 3 }}>
        <Container fixed>
          <Paper elevation={0} >
            <Title variant="h5">Dont miss Out on These!!!</Title>
            <Divider sx={{ marginTop: 2 }} />
            <Grid sx={{ marginTop: 1 }} container spacing={3}>
              {itemData.map((item, index) => (
                <Grid key={index} item xs={12} md={6}>
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: 230,
                      objectFit: { xs:"contain", md: "cover"}
                    }}
                    alt="ads image"
                    src={item.img}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
          <Stack
            direction="row"
            sx={{ marginTop: 4 }}
            justifyContent="space-between"
          >
            <Box>
              <Title variant="h4">Popular Products</Title>
              <Content sx={{ fontSize: 12 }}>
                Browse through popular products available to you.
              </Content>
            </Box>
            <Button
              variant="text"
              onClick={null}
              sx={{ textTransform: "capitalize" }}
              endIcon={<ArrowForwardIcon />}
            >
              See all popular products
            </Button>
          </Stack>
          <Divider sx={{ marginTop: 2 }} />
          {props.popular_items ? <Grid sx={{ marginTop: 1 }} container spacing={3}>
            {props.popular_items.results.map((element, index) => (
              <Grid item xs={12} md={3}>
                <Product
                  key={index}
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
          </Grid> : null}
        </Container>
      </Box>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    popular_items: state.products.popular_products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    get_popular_item: () => dispatch(products_popular())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "/banner2.jpeg",
    title: "Breakfast",
    // rows: 2,
    cols: 2,
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  //   title: 'Burger',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  //   title: 'Camera',
  // },
  {
    img: "/banner4.jpeg",
    title: "Coffee",
    cols: 2,
  },
];
