import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [note, setNote] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const noteToNull = () => {
    setTimeout(() => {
      setNote(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.some(p => p.name === newName && p.number !== newNumber)){
      if(confirm(`${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
          const inList = persons.find((p) => p.name === personObject.name)
          const changedPerson = {...inList, number: personObject.number}
          personServices
            .updateNumber(inList.id, changedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id !== inList.id ? p : response))
              setNewName("")
              setNewNumber("")
              setNote(
                `Changed number for ${inList.name}`
              )
              noteToNull()
            })
            .catch(error => {
              setNote(
                `Information of ${inList.name} has already been removed from server`
              )
              setPersons(persons.filter(p => p.id !== inList.id))
            })
        }
    } else if (persons.some(p => p.name === newName)){
        alert(`${newName} is aleady added to phonebook`)
        setNewName("")
        setNewNumber("")
    } else {
      personServices
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          setNote(
            `Added ${personObject.name}`
          )
        })
        .catch(error => {
          setNote(
            `${Object.values(error.response.data).flat().join()}`
          )
        })
        noteToNull()
    }
  }

  const deletePerson = (name, id) => {
    if(confirm(`Delete ${name}?`)) {
      personServices
        .destroyPerson(id)
      setPersons(persons.filter((p) => p.id !== id))
    }
    setNote(
      `Deleted ${name}`
    )
    noteToNull()
  }

  const handleNameAdd = (event) => setNewName(event.target.value)
  const handleNumberAdd = (event) => setNewNumber(event.target.value)
  const handleFilterName = (event) => setFilterName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={note}/>
      <Filter value={filterName} onChange={handleFilterName}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addName}
      name={newName} onName={handleNameAdd}
      number={newNumber} onNumber={handleNumberAdd}/>
      <h3>Numbers</h3>
      <Persons personObj={persons} filter={filterName}
      onClick={deletePerson}/>
    </div>
  )

}

export default App