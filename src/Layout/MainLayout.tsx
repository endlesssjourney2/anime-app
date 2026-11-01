import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
