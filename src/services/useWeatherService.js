import {
  useHttp
} from '../hooks/http.hook';

const useWeatherService = () => {
  const {
    process,
    setProcess,
    request,
    clearError
  } = useHttp();

  const _apiBase = 'https://api.weatherapi.com/v1';
  const _apiKey = 'eb55fdf085fd48c0b0f154526221603';

  const getWeather = async (latitude, longitude) => {
    const res = await request(`${_apiBase}/current.json?key=${_apiKey} &q=${latitude},${longitude}&aqi=no`);
    return _transformWeather(res);
  }

  const _transformWeather = (data) => {
    return {
      tempC: Math.round(parseInt(data.current.temp_c)) + ' °C',
      weather: data.current.condition.text,
      wind: Math.round(parseInt(data.current.wind_kph) * (5 / 18)) + ' m/s',
    }
  }

  return {
    wtProcess: process,
    wtSetProcess: setProcess,
    wtClearError: clearError,
    getWeather,
  }
}

export default useWeatherService;