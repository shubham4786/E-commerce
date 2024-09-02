import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "./features/productsSlice";
import Checkout from "./components/Checkout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      {/* <Checkout /> */}
    </>
  );
}

export default App;
