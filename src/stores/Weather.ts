import { api } from './../utils/api'
import { IWeather } from './../models/weathet'
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

class Weather {
  @observable lenguage = ''
  @observable forecast: Array<IWeather> = []
  @observable randonTemp = []
  @observable timeChart = []

  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.forecast,
      _ => console.log(toJS(this.forecast))
    )
  }

  @action setLenguage(lenguage: string) {
    this.lenguage = lenguage
  }

  @action setRandonTemp(randonTemp: any) {
    this.randonTemp = randonTemp
  }
  @action setTimeChart(time: any) {
    this.timeChart = time
  }
  // @action updateWeather(temp: any) {
  //   if (this.forecast.length) {
  //     this.forecast = [
  //       { ...this.forecast[0], main: { ...this.forecast[0].main,  temp } },
  //     ]
  //   }
  // }

  @action async fetchForecast(sity: string) {
    const response = await api.get(`/weather`, {
      params: {
        q: sity,
        units: 'metric',
        appid: process.env.REACT_APP_API_KEY,
        lang: this.lenguage,
      },
    })
    this.setForecast(response.data)
  }

  @action.bound setForecast(newForecastApi: IWeather) {
    this.forecast = [newForecastApi]
  }

  @action async fetchForecastByLocation(lat: number, lon: number) {
    const REACT_API_KEY = 'b32058f10fd03c991cd00d5d3d9b95f9'
    const BASE_URL_WEATHER_BY_LOCATION =
      'https://api.openweathermap.org/data/2.5/'
    await axios
      .get(
        `${BASE_URL_WEATHER_BY_LOCATION}weather?lat=${lat}&lon=${lon}&appid=${REACT_API_KEY}`
      )
      .then(response => response.data)
      .then(newForecastByLocationApi => {
        this.setForecast(newForecastByLocationApi)
      })
  }
}
export default new Weather()
