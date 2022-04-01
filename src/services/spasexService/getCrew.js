export const getCrew = (request, _apiBase) => {
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
      launches: member.launches,
      status: member.status,
    }
  }

  return {
    getAllCrewMembers,
    getOneCrewMember
  }
}