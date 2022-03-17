// components
import Landpads from "../components/Landpads/Landpads";
import LaunchesList from "../components/Launches/LaunchesList";
import UpcomingLaunchesList from "../components/UpcomingLaunches/UpcomingLaunchesList";
import Launchpads from "../components/Launchpads/Launchpads";

const MainPage = () => {
  return (
    <>
      <UpcomingLaunchesList />
      <LaunchesList />
      <Launchpads />
      <Landpads />
    </>
  )
}

export default MainPage;