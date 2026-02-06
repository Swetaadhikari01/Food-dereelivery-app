import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />   {/* 🔥 visible on all pages */}
      <div style={{ paddingTop: "70px" }}>
        <Outlet />  {/* Pages will render here */}
      </div>
    </>
  );
};

export default Layout;
