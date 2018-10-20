import React from 'react';
import FilterShown from './components/FilterShown';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      this.setState({ countries: response.data })
    })
  }

  handleFilterChange = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  handleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    //const shownPersons = () => this.state.persons.map(person => <li>{person.name}</li>)
    console.log(this.state.countries.filter(country => country.name.toLowerCase().startsWith(this.state.filter.toLowerCase())))
    const filteredCountries = 
      this.state.countries.filter(country => country.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))

    const shownCountries = () => {
      if (filteredCountries.length > 10) {
        return <p>too many countries</p>
      }
      else if (filteredCountries.length > 1) {
        return filteredCountries.map(country => <p key={country.name}>
        <div>
          <button 
          onClick={this.handleSearch}
          name="filter"
          value={country.name}
          >
          {country.name}
          </button>
          </div>
          </p>)
      }
      else if (filteredCountries.length === 1) {
        return (
          filteredCountries.map(country => <div key={country.name}>
          <p><h2>{country.name} {country.nativeName}</h2></p>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <p><img src={country.flag} width="50%" height="50%" /></p>
          </div>)
        )
      }
      else {
        return <p>no countries found with the search</p>
      }
    }

    return (
      <div>
        <div>
          <FilterShown filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        </div>
        <div>
          {shownCountries()}
        </div>
      </div>
    )
  }
}

export default App