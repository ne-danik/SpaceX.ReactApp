import { useHttp } from '../../hooks/http.hook';

import { getCompany } from './getCompany';
import { getCrew } from './getCrew';
import { getDragons} from './getDragons';
import { getHistory } from './getHistory';
import { getLandpads} from './getLandpads';
import { getLaunches } from './getLaunches';
import { getLaunchpads } from './getLaunchpads';
import { getRockets } from './getRockets';
import { getShips } from './getShips';
import { getStarlink } from './getStarlink';
  
const useSpacexService = () => {
  const {
    process,
    setProcess,
    request,
    clearError
  } = useHttp();

  const _apiBase = 'https://api.spacexdata.com/v4';

  // Get Company Info
  const {getCompanyInfo} = getCompany(request, _apiBase);

  // Get Crew
  const {getAllCrewMembers, getOneCrewMember} = getCrew(request, _apiBase);

  // Get Dragons
  const {getAllDragons, getOneDragon} = getDragons(request, _apiBase);

  // Get History
  const {getAllHistory, getOneHistory} = getHistory(request, _apiBase);

  // Get Landpads
  const {getAllLandpads, getOneLandpad} = getLandpads(request, _apiBase);

  // Get Launches
  const {getAllLaunches, getAllPastLaunches, getUpcomingLaunches, getNextLaunch, getOneLaunch} = getLaunches(request, _apiBase);

  // Get Launchpads
  const {getAllLaunchpads, getOneLaunchpad} = getLaunchpads(request, _apiBase);

  // Get Rockets
  const {getAllRockets, getOneRocket} = getRockets(request, _apiBase);

  // Get Ships
  const {getAllShips, getOneShip} = getShips(request, _apiBase);

  // Get Starlink
  const {getAllStarlink, getOneStarlink} = getStarlink(request, _apiBase);

  return {
    process,
    setProcess,
    clearError,

    getCompanyInfo,

    getAllCrewMembers,
    getOneCrewMember,

    getAllDragons,
    getOneDragon,

    getAllHistory,
    getOneHistory,

    getAllLandpads,
    getOneLandpad,

    getAllLaunches,
    getAllPastLaunches,
    getUpcomingLaunches,
    getNextLaunch,
    getOneLaunch,

    getAllLaunchpads,
    getOneLaunchpad,

    getAllRockets,
    getOneRocket,

    getAllShips,
    getOneShip,

    getAllStarlink,
    getOneStarlink,
  }
}

export default useSpacexService;