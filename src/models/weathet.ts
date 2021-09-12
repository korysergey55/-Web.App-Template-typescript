export interface IWeather {
  base: string
  clouds: {
    all: number
  }
  coord: {
    lat: number
    lon: number
  }
  dt: number
  id: number
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  }
  timezone: number
  visibility: number
  weather: [
    {
      description: string
      icon: string
      id: number
      main: string
    }
  ]
  wind: {
    deg: number
    speed: number
  }
}

export interface Employees {
  [key: string]: readonly (number|string|boolean)[]
}
const mployees: Employees  = {
  mango: [6,8,3,5,7],
  poly: [6,8,3,5,7],
  ajax: ["6","8","3","5","7"],
  alex: [true,false]
}

type  AddFn = (a: number, b: number) => number;

const addNumbers: AddFn = (a, b) => {
return a + b 
}