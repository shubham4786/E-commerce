import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  checkUserExists,
  signupUser,
  changeLocation,
} from "../redux/auth/authActions";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, userExists, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleCheckUserExists = () => {
    dispatch(checkUserExists(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userExists) {
      swal({ icon: "warning", title: "Username already exists, Please login" });
      navigate("/login");
    } else {
      dispatch(signupUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user]);

  useEffect(() => {
    console.log(error);
    if (error)
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    dispatch(changeLocation());
  }, [error]);

  return (
    <div className="container mx-auto p-8 pt-20">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        onBlur={handleCheckUserExists}
        className="max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-gray-500  mt-1">
          Already Registered?{" "}
          <span
            className=" cursor-pointer font-bold hover:text-gray-700"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
