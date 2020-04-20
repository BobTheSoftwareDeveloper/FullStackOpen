import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ changeFilterText, filterText }) => {
  return (
    <div>
      filter shown with <input onChange={changeFilterText} value={filterText}/>
    </div>
  )
}

const PersonForm = ({ addPhone, newName, changeName, newNumber, changeNumber }) => {
  return (
    <form onSubmit={addPhone}>
      <div>
        name: <input value={newName} onChange={changeName} /> 
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form> 
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const checkDuplicate = (name) => {
    name = name.toLowerCase()
    console.log("checking", name, "name")
    for (const person of persons) {
      if (person.name.toLowerCase() === name) {
        return true
      }
    }
    return false
  }

  const addPhone = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert("Empty name submitted")
    } else if (checkDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterText = (event) => {
    setFilterText(event.target.value)
  }

  const personsToShow = filterText === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter changeFilterText={changeFilterText} filterText={filterText} />

      <h3>Add a new contact</h3>
      <PersonForm addPhone={addPhone} newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App