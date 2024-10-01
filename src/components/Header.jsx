import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authActions";
import Avatar from "@mui/material/Avatar";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.products.cart);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };
  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };

  const handleOptionClick = (option) => {
    setIsDropDownOpen(false);
    if (option == "Profile") {
      navigate("/profile");
    }
    if (option == "Logout") {
      dispatch(logout());
    }
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
    <nav className="bg-blue-600  fixed w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-2xl font-bold p-2" to={"/"}>
          ShopFlex
        </Link>
        <div className="hidden md:flex space-x-6">
          {constantRoute.map((item) => (
            <Link
              className="text-white hover:text-gray-300 text-xl p-2"
              key={item.id}
              to={item.route}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div
              className="relative inline-block text-left"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Avatar
                sx={{ bgcolor: "#333333", "&:hover": { bgcolor: "#0066cc" } }}
                className="m-1 cursor-pointer text-white hover:text-gray-300 "
              >
                {user.name.split(" ")[0].charAt(0).toUpperCase()}
                {user.name.split(" ")[1] &&
                  user.name.split(" ")[1].charAt(0).toUpperCase()}
              </Avatar>
              {isDropDownOpen && (
                <div className="absolute right-0  w-36 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => handleOptionClick("Profile")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleOptionClick("Orders")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Orders
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleOptionClick("Logout")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <span
              className="text-white hover:text-gray-300 text-xl cursor-pointer p-2"
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
