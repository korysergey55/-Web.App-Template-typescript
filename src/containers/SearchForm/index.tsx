import React, { Component } from 'react'
import styles from './styles.module.scss'
// import{ getCurrentWeather} from '../../actions/api'

class SearchForm extends Component {
  state = {
    sity: '',
    country: '',
  }
  onHandleChange = (evt: { target: { name: any; value: any } }) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }
  handleSubmitForm = (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    // getCurrentWeather(this.state.sity)
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
            <select
              className={styles.inputSelect}
              name="country"
              value={this.state.country}
              onChange={this.onHandleChange}
            >
              {/* <option value="en" name="country">EN</option>
              <option value="ua" name="country">UA</option>
              <option value="ru" name="country">RU</option> */}
            </select>
          </form>
        </div>
      </>
    )
  }
}

export default SearchForm
