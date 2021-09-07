import React, { Component } from 'react'
import Weather from '../../stores/Weather'
import { observer } from 'mobx-react'

const WeatherList = observer(() => {
  return (
    <>
      <h2>WeatherList</h2>
      {/* {Weather.forecast?.map((item)=> {
      <div className="weatherListContainer">
      <h2 className="location">{item.name}</h2>
      </div>
      })} */}
    </>
  )
})

export default WeatherList
