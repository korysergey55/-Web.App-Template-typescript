import {
  makeAutoObservable,
  configure,
  computed,
  observable,
  action,
  reaction,
  runInAction,
} from 'mobx'
import axios from 'axios'

class Weather {
  @observable lenguage = ''
  @observable forecast = [{}]

  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.forecast,
      _ => console.log(this.forecast)
    )
    // reaction(
    //   () => this.lenguage,
    //   _ => console.log(this.lenguage)
    // )
  }

  @action setLenguage(lenguage: string) {
    this.lenguage = lenguage
  }

  @action fetchForecast(sity: string) {
    const REACT_API_KEY = 'd83cbb28a38e206fdd664ad53108a5f0'
    const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/'
    axios
      .get(
        `${BASE_URL_WEATHER}weather?q=${sity}&units=metric&appid=${REACT_API_KEY}`
      )
      .then(response => response.data)
      .then(newForecastApi => {
        this.setForecast(newForecastApi)
      })
  }
  @action.bound setForecast(newForecastApi: {}) {
    this.forecast = [newForecastApi]
  }
}
export default new Weather()

// {
//   sity:observable,
//   lenguage:observable,
//   forecast: observable,
//   setSity:action,
//   setForecast: action,
//   fetchForecast: action.bound,
// }
