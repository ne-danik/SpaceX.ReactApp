export const getShips = (request, _apiBase) => {
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
      roles: ship.roles,
      port: ship.home_port,
      active: ship.active,
      year: ship.year_built,
      weight: ship.mass_kg,
      launches: ship.launches,
      image: ship.image,
    }
  }

  return {
    getAllShips,
    getOneShip
  }
}
