import React, { Component } from 'react'
import styles from './styles.module.scss'
import Weather from '../../stores/Weather'
import { Select } from 'antd'
const { Option } = Select

class SearchForm extends Component {
  state = {
    sity: '',
    language: '',
  }
  onHandleChange = (evt: { target: { name: any; value: any } }) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }
  handleSubmitForm = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    // Weather.sity(this.state.sity)
    // Weather.fetchForecast(this.state.sity)
  }
  render = () => {
    return (
      <>
        <div className={styles.formContainer}>
          <form onClick={this.handleSubmitForm}>
            <input
              className={styles.input}
              type="text"
              name="sity"
              value={this.state.sity}
              onChange={this.onHandleChange}
              placeholder="Enter city name"
            />
            <button type="submit" className={styles.buttonSubmit}>
              Add
            </button>
            {/* <select
              className={styles.inputSelect}
              name="country"
              value={this.state.language}
              onChange={this.onHandleChange}
            >
              <option value="en" name="language">EN</option>
              <option value="ua" name="language">UA</option>
              <option value="ru" name="language">RU</option>
            </select> */}

            <Select
              showSearch
              style={{ width: 72 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              defaultValue="en"
              dropdownClassName={styles.inputSelect}
              // onChange={this.onHandleChange}
              // fieldNames={options:"country"}
              // value={this.state.language}

            >
              <Option value="en">EN</Option>
              <Option value="ua">UA</Option>
              <Option value="ru">RU</Option>
            </Select>
          </form>
        </div>
      </>
    )
  }
}

export default SearchForm
