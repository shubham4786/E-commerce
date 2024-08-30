import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";

const cart = useSelector((state) => state.products.cart);

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const constantRoute = [
  {
    id: 1,
    name: "Home",
    route: "/",
  },
  {
    id: 2,
    name: (
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    ),
    route: "/cart",
  },
];
