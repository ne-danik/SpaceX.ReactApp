export const getHistory = (request, _apiBase) => {
  const getAllHistory = async () => {
    const res = await request(`${_apiBase}/history`);
    return res.map(_transformHistory);
  };

  const getOneHistory = async (id) => {
    const res = await request(`${_apiBase}/history/${id}`);
    return _transformHistory(res);
  };

  const _transformHistory = (event) => {
    return {
      id: event.id,
      title: event.title,
      date: event.event_date_utc,
      details: event.details,
      links: event.links,
    }
  }

  return {
    getAllHistory,
    getOneHistory
  }
}
