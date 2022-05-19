import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import { Content, SelectField, TextField, Title } from "../elements";
import { business_category, categories } from "../../data/categories";
import Menu from "../sidebar/elements/menuitem";
import { Category, Manufacturers, MyDrugStoc, Shipping } from "../icons";
import {
  ArrowDownward,
  ArrowDownwardOutlined,
  ArrowDropDown,
  FilterAlt,
  KeyboardArrowDown,
  Money,
  SortOutlined,
} from "@mui/icons-material";
import FilterTab from "../widgets/filterTab";
import { useRouter } from "next/router";
import { category_products } from "../../connect/products";
import { connect } from "react-redux";

function ProductsListLayout(props) {
 
  const [filterCategory, setCategory] = useState("")
  const [filterManufacturer, setManufacturer] = useState("")

  const applyFilter = (data) => {
    setCategory(data.toString())
    console.log(filterCategory)
  };

  const setBrand = (data) => {
    setManufacturer(data.toString())
    console.log(filterManufacturer)
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container sx={{ marginTop: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            underline="none"
            sx={{ cursor: "pointer" }}
            href="/account"
          >
            My account
          </Link>
          <Content sx={{ fontWeight: "500", color: "#000" }}>Home</Content>
        </Breadcrumbs>
        <Box
          component="img"
          sx={{
            width: "100%",
            height: 150,
            marginTop: 3,
            objectFit: "cover",
          }}
          alt="ads image"
          src="/no_image.png"
        />
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={2}>
              <FilterTab
                label="Filter by Category"
                options={props.category}
                applyFilter={applyFilter}
                selected={filterCategory.length > 0 ? true : false}
                checked={filterCategory.split(',')}
                search
                icon={<FilterAlt />}
              />
              <Divider orientation="vertical" />
              {/* <FilterTab label="by Composition" search icon={<MyDrugStoc />} /> */}
              <FilterTab
                label="by Manufacturers"
                options={props.manufacturer}
                applyFilter={setBrand}
                selected={filterManufacturer.length > 0 ? true : false}
                checked={filterManufacturer.split(',')}
                search
                icon={<Manufacturers />}
              />
              {/* <FilterTab label="by Price" icon={<Money />} />
              <FilterTab label="by Pickup & Shipping" icon={<Shipping />} /> */}
            </Stack>
            <Stack direction="row">
              <FilterTab label="By Recommended" icon={<SortOutlined />} />
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Grid container>
          <Grid item xs={12} md={12}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ProductsListLayout.propTypes = {};

const mapStateToProps = state => {
  return {
    category: state.category.category.results.map((element) => ({title: element.name, value: element.id })),
    manufacturer: state.category.manufacturer.results.map((element) => ({title: element.name, value: element.id})),
  }
}


export default connect(mapStateToProps)(ProductsListLayout);
