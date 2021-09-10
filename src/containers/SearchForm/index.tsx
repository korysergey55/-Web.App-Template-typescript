import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WeatherList from 'containers/WeatherList'
import { observer } from 'mobx-react'
import { Select } from 'antd'
import { useStore } from 'stores'
import { toJS } from 'mobx'
import dayjs from 'dayjs'

const { Option } = Select
const initialState = { sity: 'cherkasy' }

interface IProps {
  name?: string
  chairsCount: number
  handleChange?: () => void
}

const SearchForm: React.FC<IProps> = observer(props => {
  const { wheatherStore } = useStore()
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
    wheatherStore.setRandonTemp(arrayRandomTemperature())
    recetForm()
    getTimeForChart()
  }

  const recetForm: any = () => {
    setState({ sity: '' })
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

  const getTimeForChart = () => {
    let tempForChart = []
    let correntTime =  wheatherStore.forecast[0]?.dt
    const time = dayjs.unix(correntTime).format('HH:mm')
    tempForChart.push(time)
    console.log(time)
    return tempForChart
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
function sity(sity: any, arg1: string) {
  throw new Error('Function not implemented.')
}
