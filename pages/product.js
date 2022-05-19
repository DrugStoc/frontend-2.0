import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Navbar from "../components/Navbar/Navbar";
import { categories } from "../data/categories";
import SearchIcon from "@mui/icons-material/Search";
import { manufacturers } from "../data/manufacturers";
import { products } from "../data/products";
import Product from "../components/Products/Product";

const options = ["Option 1", "Option 2"];

export default function Products() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Navbar />
      <Container fixed>
        <Box sx={{ paddingY: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              DrugStoc
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/getting-started/installation/"
            >
              Products
            </Link>
          </Breadcrumbs>
          <Box sx={{ paddingTop: 1 }} />
          <Typography variant="h5" gutterBottom component="div">
            All Anti-Malaria products
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ display: { xs: "none", md: "flex" } }}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#ffffff",
                  width: "100%",
                  flexGrow: 1,
                  borderRadius: 1,
                  //   padding: 2,
                }}
              >
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
                >
                  CATEGORIES
                </Typography>
                <Box
                  sx={{
                    maxHeight: 300,
                    width: "100%",
                    overflow: "scroll",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <MenuList dense>
                    {categories.map((element, i) => (
                      <MenuItem key={i} sx={{ padding: 1 }}>
                        <ListItemText>{element.name}</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                          {element.total_products}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Box>
                <Divider />
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
                >
                  MANUFACTURERS
                </Typography>
                <Box sx={{ paddingLeft: 1, paddingRight: 1 }}>
                  <TextField
                    id="outlined-basic"
                    sx={{ width: "100%" }}
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                  />
                </Box>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflow: "scroll",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  <MenuList dense>
                    {manufacturers.map((element, i) => (
                      <MenuItem key={i} sx={{ padding: 1.2 }}>
                        <Avatar
                          alt="Manufacturer Image"
                          src={element.image}
                          sx={{
                            padding: 0,
                            marginRight: 2,
                            width: 24,
                            height: 24,
                          }}
                        />
                        <ListItemText sx={{ width: "70%" }}>
                          {element.name}
                        </ListItemText>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={9} sx={{ display: { md: "flex" } }}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#ffffff",
                  width: "100%",
                  flexGrow: 1,
                  borderRadius: 1,
                  padding: 2,
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Shop Online Anti-Malaria products
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  {products.map((element, i) => (
                    <Grid key={i} item xs={6} sm={4} md={3}>
                      <Product data={element} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
