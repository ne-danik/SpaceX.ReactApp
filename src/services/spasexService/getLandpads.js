export const getLandpads = (request, _apiBase) => {
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
      status: landpad.status,
      wikipedia: landpad.wikipedia,
      launches: landpad.launches,
      image: landpad.images.large[0],
    }
  }

  return {
    getAllLandpads,
    getOneLandpad
  }
}
