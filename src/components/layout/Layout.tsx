import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;
