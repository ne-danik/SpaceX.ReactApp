export const getCompany = (request, _apiBase) => {
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
      vehicles: info.vehicles,
      launchSites: info.launch_sites,
      testSites: info.test_sites,
      summary: info.summary,
      valuation: info.valuation,
      ceo: info.ceo,
      cto: info.cto,
      coo: info.coo,
      ctoPropulsion: info.cto_propulsion,
      links: {
        website: info.links.website,
        flickr: info.links.flickr,
        twitter: info.links.twitter,
        elonTwitter: info.links.elon_twitter,
      },
    }
  }

  return {
    getCompanyInfo
  }
}