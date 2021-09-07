import React, { useState } from 'react'
import styles from './styles.module.scss'
import WeatherList from 'containers/WeatherList'
import { observer } from 'mobx-react'
import { Select } from 'antd'
import { useStore } from 'stores'
const { Option } = Select

const SearchForm = observer(() => {
  const { wheatherStore } = useStore()
  const initialState = {
    sity: '',
  }
  const [state, setState] = useState(initialState)

  const onHandleChange = (evt: any) => {
    const { name, value } = evt.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const onHandleSelectChange = (evt: any) => {
    wheatherStore.setLenguage(evt)
  }

  const handleSubmitForm = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    wheatherStore.fetchForecast(state.sity)
  }
  return (
    <>
      <div className={styles.formContainer}>
        <form onClick={handleSubmitForm}>
          <input
            className={styles.input}
            type="text"
            name="sity"
            value={state.sity}
            onChange={onHandleChange}
            placeholder="Enter city name"
          />
          <button type="submit" className={styles.buttonSubmit}>
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
