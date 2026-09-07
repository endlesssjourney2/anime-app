import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
