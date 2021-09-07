import React, { Component } from 'react'
import styles from './styles.module.scss'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useStore } from 'stores'
import dayjs from 'dayjs'
const iconURL = 'http://openweathermap.org/img/wn/';
// const icon = `${iconURL}${item.weather[0].icon}.png`;

const WeatherList = observer(() => {
  const { wheatherStore } = useStore()
  const { forecast } = wheatherStore
  console.log(toJS(forecast))

  const changeTemperage =(evt: any)=>{
    console.log(evt)
  }

  return (
    <>
      {Object.keys(forecast[0]).length && forecast?.map((item: any, index: number) => {
        return (
          <div className={styles.weathermainContainer} key={item.id}>
          <div  className={styles.weatherListContainer}>
            <h2 className={styles.location}>{item.name},{item.sys?.country}</h2>
            <div className={styles.hederWeatherContainer}>
            <img className={styles.iconWheather} src={`${iconURL}${item.weather[0].icon}.png`} width='35' height='35' />
            <p className={styles.weatherDiscription}>{item.weather[0].description}</p>
            </div>
            </div>
            <h2> {dayjs.unix(item.dt).format('dddd, D MMMM, HH:mm')}</h2>
            <div className={styles.grafic}></div>
            <div className={styles.buttonsContainer}>
            <button className={styles.buttonCelciy} onClick={changeTemperage}>&deg;C</button>
            <button className={styles.buttonFaringeit} onClick={changeTemperage}>&deg;F</button>
            </div>
            <p className={styles.temperature}>+ {item.main?.temp.toFixed(0)}</p>
            <p className={styles.temperatureFellsLike}>Feels like: {item.main.feels_like.toFixed(0)} &deg;C</p>
            <div className={styles.rightSideContainer}>
              <p className={styles.rightSide}>Wind: <span className={styles.rightSidespan}>{item.wind.speed}m/s</span></p>
              <p className={styles.rightSide}>Humidity: <span className={styles.rightSidespan}>{item.main.humidity}%</span></p>
              <p className={styles.rightSide}>Pressure: <span className={styles.rightSidespan}>{item.main.pressure}Pa</span></p>
            </div>
            </div>
         )
      })}
    </>
  )
})

export default WeatherList
