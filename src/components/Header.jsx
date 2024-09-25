import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authActions";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.products.cart);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const constantRoute = [
    {
      id: 1,
      name: "Home",
      route: "/",
    },

    {
      id: 2,
      name: (
        <>
          <StyledBadge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
          <span className="pl-1">Cart</span>
        </>
      ),
      route: "/cart",
    },
  ];

  return (
    <nav className="bg-blue-600 p-4 fixed w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-2xl font-bold" to={"/"}>
          ShopFlex
        </Link>
        <div className="hidden md:flex space-x-6">
          {constantRoute.map((item) => (
            <Link
              className="text-white hover:text-gray-300 text-xl "
              key={item.id}
              to={item.route}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <span
              className="text-white hover:text-gray-300 text-xl cursor-pointer"
              onClick={() => dispatch(logout())}
            >
              Logout
            </span>
          ) : (
            <span
              className="text-white hover:text-gray-300 text-xl cursor-pointer"
              onClick={() =>
                navigate("/login", { state: { from: location.pathname } })
              }
            >
              Login
            </span>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          {constantRoute.map((item) => (
            <Link
              className="block text-white py-2 px-4 hover:bg-blue-500"
              key={item.id}
              to={item.route}
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <span
              className="block text-white py-2 px-4 hover:bg-blue-500"
              onClick={() => {
                dispatch(logout());
                toggleMenu();
              }}
            >
              Logout
            </span>
          ) : (
            <span
              className="block text-white py-2 px-4 hover:bg-blue-500"
              onClick={() => {
                navigate("/login", { state: { from: location.pathname } });
                toggleMenu();
              }}
            >
              Login
            </span>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
