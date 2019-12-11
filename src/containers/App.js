import React, { Component } from 'react'

import classes from './App.css'
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons'


class App extends Component {
  constructor(props) {
    super(props)
    console.log('[App.js] constructor')
  }

static getDerivedStateFromProps(props, state) {
  console.log('[App.js] getDerivedStateFromProps', props)
  return state
}

// Will be removed in future versions
// componentWillMount() {
//   console.log('[App.js] componentWillMount');
// }

componentDidMount() {
  console.log('[App.js] componentDidMount');
}

  state = {
    persons: [
      { id: 'adfg23', name: 'Max', age: 28 },
      { id: 'kbkjh3', name: 'Manu', age: 29 },
      { id: 'pouiy8', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons:persons})
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState( {persons: persons} )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow})
  }

  render() {
    console.log('[App.js] render()')
    let persons = null

    if ( this.state.showPersons ) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler} 
          changed={this.nameChangedHandler} />
    }

    return (
        <div className={classes.App}>
          <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler} />
          {persons}
        </div>
    );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
