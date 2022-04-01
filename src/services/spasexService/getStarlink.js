export const getStarlink = (request, _apiBase) => {
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
      launchDate: sat.spaceTrack.LAUNCH_DATE,
    }
  }

  return {
    getAllStarlink,
    getOneStarlink
  }
}
