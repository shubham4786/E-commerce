import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {!isHomePage && <Header />}

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
