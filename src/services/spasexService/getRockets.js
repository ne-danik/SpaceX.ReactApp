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
      height: String(rocket.height.meters),
      diameter: String(rocket.diameter.meters),
      mass: String(rocket.mass.kg),
      stages: String(rocket.stages),
      status: String(rocket.active),
      successRate: String(rocket.success_rate_pct),
      cost: String(rocket.cost_per_launch),
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
