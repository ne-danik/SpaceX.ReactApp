export const getDragons = (request, _apiBase) => {
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
      firstFlight: dragon.first_flight,
      images: dragon.flickr_images,
      wikipedia: dragon.wikipedia,
      status: dragon.active,
      crewCapacity: dragon.crew_capacity,
      height: dragon.height_w_trunk.meters,
      diameter: dragon.diameter.meters,
      payloadMass: dragon.launch_payload_mass.kg,
    }
  }

  return {
    getAllDragons,
    getOneDragon
  }
}
