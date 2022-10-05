import React from 'react';
import { useState,useEffect } from 'react'
import phonebookService from './services/phonebook';

const Filter=(props)=>{

  return(
    <p>Filter shown with: <input onChange={props.handleChange} /></p>
  )
}

const PersonForm = (props)=>{
  let addNewPerson = props.handleSubmit
  let newPerson=props.newPerson
  let handlePersonChange=props.handleInputChange

  return(
    <form onSubmit={addNewPerson}>
        <div>
          <p>name: <input value={newPerson.name} onChange={handlePersonChange} name='name' /></p>
          <p>number: <input value={newPerson.number} onChange={handlePersonChange} name='number' /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className='addedPerson'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

//------------------------------------------------------------------------------------------ Start of app -------------------------------------------
const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState([{name:'',number:''}])
  const [filteredList,setFilteredList]=useState(persons)
  const [addMessage, setAddMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
        setFilteredList(initialPhonebook)
      })
  }, [])
  
  const handleListChange=(event)=>{
    const query = event.target.value;
    if(query.length>0){
      let updatedList = [...persons];
      updatedList=updatedList.filter((person) => person.name.indexOf(query) !== -1)
      setFilteredList(updatedList)
    }else{
      setFilteredList(persons)
    }
    
  }
  
  const handlePersonChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  }

  function addNewPerson(event) {
    event.preventDefault();
    const personObject = {
      name: newPerson.name,
      number: newPerson.number
    };
    let updatedList = [...persons]

    let checkName = persons.some(e => e.name === newPerson.name);
    let checkNumber = persons.some(e => e.number === newPerson.number);

    if (checkName) {
      if(window.confirm(newPerson.name + ' is already added to the phonebook, replace the old numebr with a new one?')){
        const person = persons.find(n => n.name === newPerson.name);
        phonebookService
          .update(person.id, personObject)
          .then(returnedPhonebook=>{
            setFilteredList(updatedList.map(p => p.name !== person.name ? p : returnedPhonebook ));
            setNewPerson([{ name: '', number: '' }]);
            event.target.reset();
            setAddMessage(
              `Modifyed ${person.name}'s number `
            )
            setTimeout(() => {
              setAddMessage(undefined)
            }, 5000)
          })
          .catch(error=>{
            console.log(error)
            setNewPerson([{ name: '', number: '' }]);
            event.target.reset();
            setErrorMessage(
              `information of ${person.name} has already been removed from server `
            )
            setTimeout(() => {
              setErrorMessage(undefined)
            }, 5000)

          })
      }else{
        setNewPerson([{ name: '', number: '' }]);
        event.target.reset();
      }
      
    } else {
      phonebookService
        .create(personObject)
        .then(returnedPhonebook => {
          setPersons(updatedList.concat(returnedPhonebook));
          setFilteredList(updatedList.concat(returnedPhonebook));
          setNewPerson([{ name: '', number: '' }]);
          setAddMessage(
            `Added ${personObject.name} `
          )
          setTimeout(() => {
            setAddMessage(undefined)
          }, 5000)
        })
      event.target.reset();
    }
  }

  const deletePerson = (person) =>{
    let updatedList = [...persons];
    let id = person.id
    if(window.confirm(`Delete ${person.name}`)){
      phonebookService
        .deletePerson(id)
        .then(returnedPhonebook=>{
          setFilteredList(updatedList=>updatedList.filter((u)=>u.id !== id));
        })
    }
    
  }

  return (
    <><div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleChange={handleListChange}/>
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addNewPerson}
        newPerson={newPerson}
        handleInputChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <ul>
      {filteredList.map((person)=>
        <><li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li></>
      )}
    </ul>
    </div>
    </>
  )
}

export default App