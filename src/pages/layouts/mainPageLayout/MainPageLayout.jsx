import { Outlet } from "react-router-dom";
// components
import NavBar from "../../../components/NavBar/NavBar";
import Search from "../../../components/Search/Search";

const MainPageLayout = () => {
  return (
    <>
      <div className="container">
        <Search />
        <NavBar />
      </div>

      <Outlet />
    </>
  )
}

export default MainPageLayout;