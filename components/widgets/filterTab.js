import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button as ButtonBase,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, TextField, Title } from "../elements";

function FilterTab(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState([]);
  const [items, setItems] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isChecked = (value) => {
    let exist = props.checked.filter(el => el == value )
    if (exist > 0) {
      return true
    } else {
      return false
    }
  }

  const selectOptions = (e) => {
    let num = parseInt(e.target.value);

    // check if value exist in items list
    let exist = items.filter((el) => el == num);
    if (exist.length > 0) {
      let new_list = items.filter((el) => el != num);
      console.log(new_list)
      setItems(new_list);
    } else {
      let new_push = [...items, num];
      setItems(new_push);
    }
  };

  const apply = () => {
    props.applyFilter(items);
    setAnchorEl(null);
  };

  const search = (query) => {
    console.log(query);
  };

  return (
    <div>
      <Chip
        label={props.label}
        icon={props.icon}
        color={props.selected ? "primary": "default"}
        onClick={handleClick}
        onDelete={() => null}
        deleteIcon={<KeyboardArrowDown />}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
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
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Title sx={{ paddingLeft: 2 }}>{props.label}</Title>
        <Divider />
        {props.search ? (
          <div>
            <Box sx={{ padding: 2 }}>
              <TextField
                onChange={(e) => search(e.target.value)}
                placeholder={`Search ${props.label}`}
              />
            </Box>
            <Divider />
          </div>
        ) : null}
        <FormGroup>
          <Box sx={{ maxHeight: 200, overflow: "scroll", overflowX: "hidden" }}>
            {props.options.map((element, index) => (
              <MenuItem>
                <FormControlLabel
                  key={index}
                  sx={{ width: 300 }}
                  onSelect={selectOptions}
                  control={
                    <Checkbox defaultChecked={isChecked(element.value)} value={element.value} onChange={selectOptions} />
                  }
                  label={element.title}
                />
              </MenuItem>
            ))}
          </Box>
          <Divider sx={{ marginTop: 2 }} />
          <Box sx={{ padding: 1 }}>
            <Stack direction="row" spacing={2}>
              <ButtonBase
                variant="outlined"
                sx={{ height: 35, marginBottom: 2 }}
              >
                Clear
              </ButtonBase>
              <ButtonBase
                variant="contained"
                disableElevation
                onClick={apply}
                sx={{ height: 35, width: "100%" }}
              >
                Apply Filter
              </ButtonBase>
            </Stack>
          </Box>
        </FormGroup>
      </Menu>
    </div>
  );
}

FilterTab.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  checked: PropTypes.array.isRequired,
  search: PropTypes.bool,
  selected: PropTypes.bool,
  options: PropTypes.array.isRequired,
  applyFilter: PropTypes.func.isRequired,
};

FilterTab.defaultProps = {
  search: false,
  selected: false,
  checked: [],
  options: [
    {
      title: "Option 1",
      value: "option1",
    },
    {
      title: "Option 2",
      value: "option2",
    },
  ],
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTab);
