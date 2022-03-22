// components
import Landpads from "../components/Landpads/Landpads";
import LaunchesList from "../components/Launches/LaunchesList";
import UpcomingLaunchesList from "../components/UpcomingLaunches/UpcomingLaunchesList";
import Launchpads from "../components/Launchpads/Launchpads";
import NextLaunch from "../components/NextLaunch/NextLaunch";

const MainPage = () => {
  return (
    <>
      <NextLaunch />
      <UpcomingLaunchesList />
      <LaunchesList />
      <Launchpads />
      <Landpads />
    </>
  )
}

export default MainPage;