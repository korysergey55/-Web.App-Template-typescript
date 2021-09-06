import {
  makeAutoObservable,
  configure,
  computed,
  observable,
  action,
} from 'mobx'
import axios from 'axios'
// import { decorate } from 'mobx'

class Weather {
  sity = ''
  forecast = [{}]

  constructor() {
    makeAutoObservable(this, {
      forecast: observable,
      setForecast: action,
      fetchForecast: action.bound,
    })
  }

  fetchForecast(sity: { preventDefault: () => void }) {
    const REACT_API_KEY = 'd83cbb28a38e206fdd664ad53108a5f0'
    const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/'
    axios
      .get(
        `${BASE_URL_WEATHER}weather?q=${sity}&units=metric&appid=${REACT_API_KEY}`
      )
      .then(response => response.data)
      .then(newForecastApi => {
        console.log(newForecastApi)
        // this.setForecast(newForecastApi)
      })
  }
  setForecast(newForecastApi: any) {
    this.forecast = [...this.forecast, ...newForecastApi]
  }
}
export default new Weather()
