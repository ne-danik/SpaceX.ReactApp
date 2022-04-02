export const getRockets = (request, _apiBase) => {
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
      company: rocket.company,
      description: rocket.description,
      firstFlight: rocket.first_flight,
      height: rocket.height.meters,
      diameter: rocket.diameter.meters,
      mass: rocket.mass.kg,
      stages: rocket.stages,
      status: rocket.active,
      successRate: rocket.success_rate_pct,
      cost: rocket.cost_per_launch,
      payloadWeights: rocket.payload_weights,
      images: rocket.flickr_images,
      wikipedia: rocket.wikipedia,
    }
  }

  return {
    getAllRockets,
    getOneRocket
  }
}
