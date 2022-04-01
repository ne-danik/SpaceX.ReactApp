export const getLaunchpads = (request, _apiBase) => {
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
      status: launchpad.status,
      details: launchpad.details,
      rockets: launchpad.rockets,
      launches: launchpad.launches,
      image: launchpad.images.large[0],
    }
  }

  return {
    getAllLaunchpads,
    getOneLaunchpad
  }
}
