import React from 'react';
import AddPerson from './components/AddPerson';
import FilterShown from './components/FilterShown';
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (this.state.persons.map(person => person.name).includes(personObject.name)) {
      if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const person = this.state.persons.find(p => p.name === personObject.name)
        const changedPerson = {...person, number: this.state.newNumber}
        personService
          .update(person.id, changedPerson)
          .then(changedPerson => {
            const persons = this.state.persons.filter(p => p.id !== person.id)
            this.setState({
              persons: persons.concat(changedPerson)
            })
          })
      }
    }
    else {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newPerson: '',
            newNumber: ''
          })
        })
    }
  }

  handleDeleteOf = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)

      if (window.confirm(`poistetaanko varmasti ${person.name}?`)) {
        personService
          .remove(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(p => p.id !== id)
          })
        })
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    //const shownPersons = () => this.state.persons.map(person => <li>{person.name}</li>)
    //console.log(this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase())))
    const filteredPersons =
      this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          <FilterShown filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        </div>
        <h3>Lisää uusi</h3>
        <AddPerson addPerson={this.addPerson} newName={this.state.newName} 
          handleNameChange={this.handleNameChange} newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
          {filteredPersons.map(person => 
            <p key={person.name}>
              {person.name} {person.number} <button onClick={this.handleDeleteOf(person.id)}>poista</button>
            </p>)}
      </div>
    )
  }
}

export default App