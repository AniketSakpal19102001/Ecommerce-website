import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import { ToastContainer } from "react-toastify";
function Layout() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
