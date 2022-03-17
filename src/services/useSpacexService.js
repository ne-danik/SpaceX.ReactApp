import {
  useHttp
} from '../hooks/http.hook';

const useSpacexService = () => {
  const {
    process,
    setProcess,
    request,
    clearError
  } = useHttp();

  const _apiBase = 'https://api.spacexdata.com/v4';

  // Get Company Info
  const getCompanyInfo = async () => {
    const res = await request(`${_apiBase}/company`);
    return _transformInfo(res);
  };

  const _transformInfo = (info) => {
    return {
      id: info.id,
      address: info.headquarters.address,
      city: info.headquarters.city,
      state: info.headquarters.state,
      name: info.name,
      founder: info.founder,
      founded: info.founded,
      employees: info.employees,
      summary: info.summary,
      links: {
        website: info.links.website,
        flickr: info.links.flickr,
        twitter: info.links.twitter,
        elonTwitter: info.links.elon_twitter,
      },
    }
  }



  // Get Launches
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

  const getOneLaunch = async (id) => {
    const res = await request(`${_apiBase}/launches/${id}`);
    return _transformLaunch(res);
  };

  const _transformLaunch = (launch) => {
    return {
      id: launch.id,
      name: launch.name,
      date: launch.date_local,
      details: launch.details || 'No desription... ☹️',
      patch: launch.links.patch.small || launch.links.patch.large,
      rocket: launch.rocket,
      launchpad: launch.launchpad,
      urlYoutube: launch.links.webcast,
      urlArticle: launch.links.article,
    }
  }

  // Get Launchpads
  const getAllLaunchpads = async () => {
    const res = await request(`${_apiBase}/launchpads`);
    return res.map(_transformLaunchpads);
  };

  const getOneLaunchpad = async (id) => {
    const res = await request(`${_apiBase}/launchpads/${id}`);
    return _transformLaunchpads(res);
  };

  const _transformLaunchpads = (launchpad) => {
    return {
      id: launchpad.id,
      name: launchpad.full_name,
      region: launchpad.region,
      locality: launchpad.locality,
      latitude: launchpad.latitude,
      longitude: launchpad.longitude,
      launchAttempts: launchpad.launch_attempts,
      launchSuccesses: launchpad.launch_successes,
      details: launchpad.details,
      rockets: launchpad.rockets,
      launches: launchpad.launches,
      image: launchpad.images.large[0],
    }
  }

  // Get Landpads
  const getAllLandpads = async () => {
    const res = await request(`${_apiBase}/landpads`);
    return res.map(_transformLandpads);
  };

  const getOneLandpad = async (id) => {
    const res = await request(`${_apiBase}/landpads/${id}`);
    return _transformLandpads(res);
  };

  const _transformLandpads = (landpad) => {
    return {
      id: landpad.id,
      name: landpad.full_name,
      region: landpad.region,
      locality: landpad.locality,
      latitude: landpad.latitude,
      longitude: landpad.longitude,
      landingAttempts: landpad.landing_attempts,
      landingSuccesses: landpad.landing_successes,
      details: landpad.details,
      wikipedia: landpad.wikipedia,
      launches: landpad.launches,
      image: landpad.images.large[0],
    }
  }

  // Get Crew
  const getAllCrewMembers = async () => {
    const res = await request(`${_apiBase}/crew`);
    return res.map(_transformCrew);
  };

  const getOneCrewMember = async (id) => {
    const res = await request(`${_apiBase}/crew/${id}`);
    return _transformCrew(res);
  };

  const _transformCrew = (member) => {
    return {
      id: member.id,
      name: member.name,
      agency: member.agency,
      image: member.image,
      wikipedia: member.wikipedia,
      launches: member.launches
    }
  }

  // Get Starlink
  const getAllStarlink = async () => {
    const res = await request(`${_apiBase}/starlink`);
    return res.map(_transformStarlink);
  };

  const getOneStarlink = async (id) => {
    const res = await request(`${_apiBase}/starlink/${id}`);
    return _transformStarlink(res);
  };

  const _transformStarlink = (sat) => {
    return {
      id: sat.id,
      name: sat.spaceTrack.OBJECT_NAME,
      version: sat.version,
      launch: sat.launch,
    }
  }

  // Get Dragons
  const getAllDragons = async () => {
    const res = await request(`${_apiBase}/dragons`);
    return res.map(_transformDragons);
  };

  const getOneDragon = async (id) => {
    const res = await request(`${_apiBase}/dragons/${id}`);
    return _transformDragons(res);
  };

  const _transformDragons = (dragon) => {
    return {
      id: dragon.id,
      name: dragon.name,
      type: dragon.type,
      description: dragon.description,
      first_flight: dragon.first_flight,
      images: dragon.flickr_images,
      wikipedia: dragon.wikipedia,
    }
  }

  // Get Rockets
  const getAllRockets = async () => {
    const res = await request(`${_apiBase}/rockets`);
    return res.map(_transformRockets);
  };

  const getOneRocket = async (id) => {
    const res = await request(`${_apiBase}/rockets/${id}`);
    return _transformRockets(res);
  };

  const _transformRockets = (rocket) => {
    return {
      id: rocket.id,
      name: rocket.name,
      type: rocket.type,
      country: rocket.country,
      description: rocket.description,
      firstFlight: rocket.first_flight,
      wiki: rocket.wikipedia,
      images: rocket.flickr_images.map(item => item),
    }
  }

  // Get Ships
  const getAllShips = async () => {
    const res = await request(`${_apiBase}/ships`);
    return res.map(_transformShips);
  };

  const getOneShip = async (id) => {
    const res = await request(`${_apiBase}/ships/${id}`)
    return _transformShips(res);
  };

  const _transformShips = (ship) => {
    return {
      id: ship.id,
      name: ship.name,
      type: ship.type,
      port: ship.home_port,
      weight: ship.mass_kg,
      year: ship.year_built,
      launches: ship.launches.map(item => item),
    }
  }

  return {
    process,
    setProcess,
    clearError,

    getCompanyInfo,

    getAllLaunches,
    getAllPastLaunches,
    getUpcomingLaunches,
    getOneLaunch,

    getAllLaunchpads,
    getOneLaunchpad,

    getAllLandpads,
    getOneLandpad,

    getAllCrewMembers,
    getOneCrewMember,

    getAllStarlink,
    getOneStarlink,

    getAllDragons,
    getOneDragon,

    getAllRockets,
    getOneRocket,

    getAllShips,
    getOneShip,
  }
}

export default useSpacexService;