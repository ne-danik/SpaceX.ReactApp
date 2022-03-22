import { Outlet } from "react-router-dom";
// components
import NavBar from "../../../components/NavBar/NavBar";

const MainPageLayout = () => {
  return (
    <>
      <div className="container">
        <NavBar />
      </div>

      <Outlet />
    </>
  )
}

export default MainPageLayout;