import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import WeatherList from 'containers/WeatherList'
import { observer } from 'mobx-react'
import { Select } from 'antd'
import { useStore } from 'stores'
import { toJS } from 'mobx'
import dayjs from 'dayjs'
import Modal from 'containers/Modal'

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
  const { modalStore } = useStore()

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
    wheatherStore.setTimeChart(getTimeForChart())
    modalStore.setModal()
    recetForm()
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
    let correntTime = wheatherStore.forecast[0]?.dt
    if (wheatherStore.forecast[0]?.dt) {
      for (let i = 0; i <= 7; i += 1) {
        const formatedTime = dayjs.unix(correntTime).format('HH')
        let newTime = Number(formatedTime) - i + ':00'
        tempForChart.push(newTime)
      }
    } else {
      tempForChart = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
      return tempForChart
    }

    return tempForChart.reverse()
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
      {modalStore.modal ? (
        <Modal>
          <WeatherList />
        </Modal>
      ) : null}
    </>
  )
})

export default SearchForm
