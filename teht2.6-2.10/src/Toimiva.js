import React from 'react';

class Toimiva extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    // comparison does not work at all, wouldn't want to iterate through these :/
    // perhaps map, reduce, filter or so
    console.log(this.state.persons.map(person => person.name))
    // indeed, of course map does the trick easily
    if (this.state.persons.map(person => person.name).includes(personObject.name)) {
      console.log("jee")
      console.log(this.state.persons)
      alert("duplikaatti")
    }
    else {
      const persons = this.state.persons.concat(personObject);

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value);
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    //const shownPersons = () => this.state.persons.map(person => <li>{person.name}</li>)
    console.log(this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase())))
    const filteredPersons =
      this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          <form >
            rajaa näytettäviä: <input 
            value={this.state.filter}
            onChange={this.handleFilterChange}
            />
          </form>
        </div>
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    )
  }
}

export default Toimiva