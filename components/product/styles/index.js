import { LoadingButton } from "@mui/lab";
import { Button, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

export const ProductsContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  "&:hover ": {
    boxShadow: "0 1px 14px 1px rgb(0 0 0 / 13%)",
  },
}));

export const IconButton = styled(LoadingButton)(({}) => ({
    minWidth: 0,
    padding: "10px"
}))

export const AddToCartButton = styled(LoadingButton)(({}) => ({
    padding: "10px 30px",
    transition: "linear"
}))



