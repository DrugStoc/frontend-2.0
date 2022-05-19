import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Toolbar,
} from "@mui/material";
import { connect } from "react-redux";
import { user_profile } from "../../connect/authentication";
import {
  Button,
  Content,
  Search,
  SelectField,
  SearchIconWrapper,
  StyledInputBase,
  MenuItem,
  TextField,
  Title,
} from "../elements";
import {
  Cart,
  Category,
  Delete,
  Manufacturers,
  MyDrugStoc,
  User,
} from "../icons";
import Link from "next/link";
import { Inbox, Logout, PersonAdd, Settings } from "@mui/icons-material";
import { products_category, search_products } from "../../connect/products";
import { Router, useRouter } from "next/router";

function Navbar({ user, getUserData, getCategory, category, search }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const router = useRouter()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Options = ({ name, href }) => (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/products/category/${href}`}>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );

  useEffect(() => {
    getCategory();
    if (user == null) {
      getUserData();
    }
  }, []);

  const focus = () => {
    router.push({ pathname: "/search" });
  }

  const query = (e) => {
      router.push({ pathname: "/search", query: { search: e.target.value} });
      search(e.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Box
          sx={{
            background: "#556AAF",
            padding: 2,
            paddingLeft: 10,
            paddingRight: 10,
            display: { xs: "none", md: "block" },
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={4}>
              <Stack direction="row" spacing={3}>
                <Link href="/">
                  <Box
                    component="img"
                    sx={{
                      width: 160,
                      display: { xs: "none", sm: "block" },
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="The house from the offer."
                    src="/logo_white.svg"
                  />
                </Link>
                <MenuItem
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  startIcon={<Category />}
                >
                  Categories
                </MenuItem>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <Box
                    sx={{
                      width: "300px",
                      maxWidth: 360,
                      maxHeight: 400, overflow: "scroll", overflowX: "hidden",
                      bgcolor: "background.paper",
                    }}
                  >
                    {category ?<List dense={true}>
                      {category.results.map((element, index) => <Options key={index} name={element.name} href={element.slug} />)}
                    </List>: null}
                  </Box>
                </Menu>
                <MenuItem
                  variant="contained"
                  disableElevation
                  href="/manufacturer"
                  startIcon={<Manufacturers />}
                >
                  Manufacturers
                </MenuItem>
              </Stack>
            </Grid>
            <Grid item md={6}>
              <Search>
                <SearchIconWrapper>
                  <MyDrugStoc />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onFocus={focus}
                  onChange={query}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
            <Grid item md={2}>
              <Stack direction="row" justifyContent="end" spacing={3}>
                <MenuItem
                  variant="contained"
                  href="/account"
                  disableElevation
                  startIcon={<User />}
                >
                  Account
                </MenuItem>
                <MenuItem
                  variant="contained"
                  href="/cart"
                  disableElevation
                  startIcon={
                    <Badge badgeContent={0} color="error">
                      <Cart />
                    </Badge>
                  }
                >
                  Cart
                </MenuItem>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <AppBar position="static" sx={{ display: { xs: "block", md: "none" } }}>
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton> */}
            <Title variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Title>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    category: state.category.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(user_profile()),
    getCategory: () => dispatch(products_category()),
    search: query => dispatch(search_products(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
