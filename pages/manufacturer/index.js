import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { Title } from "../../components/elements";
import Navbar from "../../components/Navbar/Navbar";
import { products_manufacturer } from "../../connect/products";

function Manufacturer(props) {
  React.useEffect(() => {
    props.getManufacturers();
  }, []);
  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 10 }} fixed>
          { props.manufacturers ? <Grid  container spacing={3}>
        {props.manufacturers.results.map((element, index) => (
            <Grid key={index} item md={3} xs={12} >
              <Card variant="outlined">
              <Link href="/">
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: 200,
                      padding: 2,
                      objectFit: "contain",
                      marginLeft: "auto", marginRight: "auto"
                    }}
                    alt="Manufacturer Images"
                    src={element.logo ? element.logo : "/logo_white.svg"}
                  />
                </Link>
              </Card>
            </Grid>
        ))}
          </Grid> : null}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    manufacturers: state.category.manufacturer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getManufacturers: () => dispatch(products_manufacturer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manufacturer);
