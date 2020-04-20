import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Message = ({ message, fontColor }) => {
  if (message == null) {
    return null
  }
  
  return (
    <div className="message" style={fontColor}>
      {message}
    </div>
  )
}

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

const deletePerson = (id, name, persons, setPersons) => {
  const result = window.confirm(`Delete ${name}?`)

  if (result) {
    personService
    .remove(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }
}

const Persons = ({ persons, personsToShow, setPersons }) => {
  if (personsToShow.length === 0) {
    return null
  } else {
    return (
      <>
        {personsToShow.map(person => 
          <React.Fragment key={person.id}>
            <span>{person.name} {person.number}</span> {" "}
            <button onClick={() => deletePerson(person.id, person.name, persons, setPersons)}>delete</button> 
            <br/>
          </React.Fragment>
        )}
      </>
    )
  }
  
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [message, setMessage] = useState(null)
  const [fontColor, setFontColor] = useState({
    color: 'green'
  })

  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  const checkDuplicate = (name) => {
    for (const person of persons) {
      if (person.name === name) {
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
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (result) {
        const modifyPerson = persons.filter(person => person.name === newName)[0]
        const id = modifyPerson.id
        const newPerson = {...modifyPerson, number: newNumber}
        personService
          .update(id, newPerson)
          .then(responsePersons => {
            setPersons(persons.map(person => person.id !== id ? person : newPerson))
          })
          .catch(error => {
            setFontColor({
              color: 'red'
            })
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } 
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .add(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setFontColor({
            color: 'green'
          })
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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
      <h1>Phonebook</h1>
      <Message message={message} fontColor={fontColor} />
      <Filter changeFilterText={changeFilterText} filterText={filterText} />

      <h2>Add a new contact</h2>
      <PersonForm addPhone={addPhone} newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} personsToShow={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App