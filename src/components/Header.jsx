import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.products.cart);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const constantRoute = [
    {
      id: 1,
      name: "Home",
      route: "/",
    },

    {
      id: 2,
      name: (
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      ),
      route: "/cart",
    },
  ];

  return (
    <nav className="bg-blue-600 p-4 fixed w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">ShopFlex</div>
        <div className="hidden md:flex space-x-6">
          {constantRoute.map((item) => (
            <Link
              className="text-white hover:text-gray-300"
              key={item.id}
              to={item.route}
            >
              {item.name}
            </Link>
          ))}
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
          <a href="#" className="block text-white py-2 px-4 hover:bg-blue-500">
            Home
          </a>
          <a href="#" className="block text-white py-2 px-4 hover:bg-blue-500">
            About
          </a>
          <a href="#" className="block text-white py-2 px-4 hover:bg-blue-500">
            Services
          </a>
          <a href="#" className="block text-white py-2 px-4 hover:bg-blue-500">
            Contact
          </a>
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
