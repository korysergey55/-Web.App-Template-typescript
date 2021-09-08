import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WeatherList from 'containers/WeatherList'
import { observer } from 'mobx-react'
import { Select } from 'antd'
import { useStore } from 'stores'
import { toJS } from 'mobx'
const { Option } = Select

const SearchForm = observer(() => {
  const { wheatherStore } = useStore()
  const { forecastByTime } = wheatherStore

  const initialState = { sity: '' }
  const [state, setState] = useState(initialState)

  const onHandleChange = (evt: any) => {
    const { name, value } = evt.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const onHandleSelectChange = (evt: any) => {
    wheatherStore.setLenguage(evt)
    wheatherStore.fetchForecast(state.sity)
  }

  const handleSubmitForm = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    wheatherStore.fetchForecast(state.sity)
    wheatherStore.fetchForecastByTime(state.sity)
    wheatherStore.setRandonTemp(arrayRandomTemperature())
  }

  const getRandomTemperature = (min = 0, max = 37) => {
    return (
      Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
      Math.ceil(min)
    )
  }
  const arrayRandomTemperature = () => {
    let temp = []
    for (let i = 0; i <= 7; i += 1) {
      temp.push(getRandomTemperature())
    }
    return temp
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form>
          <input
            className={styles.input}
            type="text"
            name="sity"
            value={state.sity}
            onChange={onHandleChange}
            placeholder="Enter city name"
          />
          <button onClick={handleSubmitForm} className={styles.buttonSubmit}>
            Add
          </button>
        </form>
        <div className="selectContainer">
          <Select
            showSearch
            style={{ width: 72 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            defaultValue="en"
            dropdownClassName={styles.inputSelect}
            onChange={onHandleSelectChange}
          >
            <Option value="en">EN</Option>
            <Option value="ua">UA</Option>
            <Option value="ru">RU</Option>
          </Select>
        </div>
      </div>
      <WeatherList />
    </>
  )
})

export default SearchForm
