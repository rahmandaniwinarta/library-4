import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

export const LayOut = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
