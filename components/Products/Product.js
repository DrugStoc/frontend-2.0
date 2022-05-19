import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function Product({ data }) {
  const currencyFormat = (num) => {
    return "₦ " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <Card variant="outlined" elevation={0} sx={{ height: 320 }}>
      <CardMedia
        component="img"
        height="140"
        image={data.image}
        alt="green iguana"
        sx={{ padding: 2 }}
      />
      <CardContent sx={{ height: 130 }}>
        <Typography
          sx={{
            width: "100%",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            lineHeight: "16px",
            maxHeight: "32px",
            WebkitBoxOrient: "vertical",
            // whiteSpace: "nowrap",
          }}
          gutterBottom
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {data.name}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {currencyFormat(data.price)}
        </Typography>
        <Typography
          sx={{
            width: "100%",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            lineHeight: "16px",
            maxHeight: "32px",
            WebkitBoxOrient: "vertical",
          }}
          gutterBottom
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {data.composition}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ShoppingCartCheckoutIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
