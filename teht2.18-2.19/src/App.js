import React from 'react';
import AddPerson from './components/AddPerson';
import FilterShown from './components/FilterShown';
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
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
              notification: `päivitettiin henkilön ${person.name} numero`,
              persons: persons.concat(changedPerson)
            })
            setTimeout(() => {
              this.setState({ notification: null })
            }, 5000)
          })
          .catch(error => {
            personService
              .create(changedPerson)
              .then(newPerson => {
                personService
                  .getAll()
                  .then(persons => {
                    this.setState({
                      persons: persons,
                      notification: `henkilö ${newPerson.name} oli jo poistettu ja nyt uudelleenlisätty`,
                      newName: '',
                      newNumber: ''
                    })
                    setTimeout(() => {
                      this.setState({ notification: null })
                    })
                  })
              })
          })
      }
    }
    else {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            notification: `lisättiin henkilö ${newPerson.name}`,
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
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
              notification: `poistettiin ${person.name}`,
              persons: this.state.persons.filter(p => p.id !== id)
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
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
        <Notification message={this.state.notification} />
        <div>
          <FilterShown filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        </div>
        <h3>Lisää uusi / muuta olemassaolevaa numeroa</h3>
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