export const getLaunches = (request, _apiBase) => {
  const getAllLaunches = async () => {
    const res = await request(`${_apiBase}/launches`);
    return res.map(_transformLaunch);
  };

  const getAllPastLaunches = async () => {
    const res = await request(`${_apiBase}/launches/past`);
    return res.map(_transformLaunch);
  };

  const getUpcomingLaunches = async () => {
    const res = await request(`${_apiBase}/launches/upcoming`);
    return res.map(_transformLaunch);
  };

  const getNextLaunch = async () => {
    const res = await request(`${_apiBase}/launches/next`);
    return _transformLaunch(res);
  };

  const getOneLaunch = async (id) => {
    const res = await request(`${_apiBase}/launches/${id}`);
    return _transformLaunch(res);
  };

  const _transformLaunch = (launch) => {
    return {
      id: launch.id,
      name: launch.name,
      flightNumber: launch.flight_number,
      date: launch.date_local,
      details: launch.details || 'No description... ☹️',
      patch_sm: launch.links.patch.small,
      patch_lg: launch.links.patch.large,
      rocket: launch.rocket,
      launchpad: launch.launchpad,
      urlYoutube: launch.links.webcast,
      urlArticle: launch.links.article,
    }
  }

  return {
    getAllLaunches,
    getAllPastLaunches,
    getUpcomingLaunches,
    getNextLaunch,
    getOneLaunch
  }
}
