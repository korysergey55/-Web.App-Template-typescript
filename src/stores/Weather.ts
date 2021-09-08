import {
  makeAutoObservable,
  configure,
  computed,
  observable,
  action,
  reaction,
  runInAction,
  toJS,
} from 'mobx'
import axios from 'axios'
// "d83cbb28a38e206fdd664ad53108a5f0" old key

class Weather {
  @observable lenguage = ''
  @observable forecast = [{}]
  @observable forecastByTime = [{}]
  @observable randonTemp = []

  constructor() {
    makeAutoObservable(this)
    // reaction(
    //   () => this.forecast,
    //   _ => console.log(toJS(this.forecast))
    // )
  }

  @action setLenguage(lenguage: string) {
    this.lenguage = lenguage
  }

  @action setRandonTemp(randonTemp:any){
    this.randonTemp = randonTemp
  }
  
  @action fetchForecast(sity: string) {
    const REACT_API_KEY = 'b32058f10fd03c991cd00d5d3d9b95f9'
    const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/'
    axios
      .get(
        `${BASE_URL_WEATHER}weather?q=${sity}&units=metric&appid=${REACT_API_KEY}&lang=${this.lenguage}`
      )
      .then(response => response.data)
      .then(newForecastApi => {
        this.setForecast(newForecastApi)
      })
  }
  @action.bound setForecast(newForecastApi: {}) {
    this.forecast = [newForecastApi]
  }


  @action fetchForecastByTime(sity: string) {
    const REACT_API_KEY = 'b32058f10fd03c991cd00d5d3d9b95f9'
    const BASE_URL_WEATHER_BY_TIME = 'https://pro.openweathermap.org/data/2.5/'
    axios
      .get(
        `${BASE_URL_WEATHER_BY_TIME}forecast/hourly?q=${sity}&appid=${REACT_API_KEY}`
      )
      .then(response => response.data)
      .then(newForecastByTimeApi => {
        this.setForecastByTime(newForecastByTimeApi)
      })
  }
  @action.bound setForecastByTime(newForecastByTimeApi: {}) {
    this.forecastByTime = [newForecastByTimeApi]
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
