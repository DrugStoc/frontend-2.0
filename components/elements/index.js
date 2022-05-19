import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Button as MuiButton, Box, Select } from "@mui/material";

export const Center = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  marginTop: "100px",
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: 700,
  lineHeight: "32px",
}));

export const Content = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: 400,
  color: "#8692A6",
  fontSize: "14px",
}));

export const FormGroup = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  padding: theme.spacing(0, 0, 2, 0),
  width: "100% !important",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

export const TextFieldWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "50%",
  right: "-2%",
  borderWidth: 2,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Label = styled(Typography)(({ theme, error }) => ({
  fontFamily: "Inter",
  fontWeight: 400,
  color: error ? "red" :"#696F79",
  fontSize: "13px",
  lineHeight: "30px",
}));

export const TextField = styled(InputBase)(({ theme, error }) => ({
  color: "inherit",
  width: "100%",
  border: `1px solid ${error ? "red": "#c3c3c5"}`,
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100% !important",
    fontSize: "13px",
  },
  '& .MuiInputBase-input:focus': {
    borderRadius: 4,
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  },
}));

export const SelectField = styled(Select)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .ui selection dropdown": {
    // padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100% !important",
    fontSize: "13px",
    fontFamily: "Inter !important",
    color: "#c3c3c5",
    border: "1px solid #c3c3c5",
    borderRadius: "5px",
  },
  '&:focus': {
    borderRadius: 4,
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  },
}));

export const MenuItem = styled(MuiButton)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 2),
  boxShadow: "none",
  transition: theme.transitions.create("width"),
  fontSize: "13px",
  color: "#ffffff",
  fontWeight: 400,
  textTransform: "none",
  borderRadius: "20px",
}));

export const Button = styled(LoadingButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 1, 1.5, 1),
  boxShadow: "none",
  transition: theme.transitions.create("width"),
  width: "100%",
  fontSize: "13px",
  fontWeight: 400,
  textTransform: "none",
  borderRadius: "50px",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
