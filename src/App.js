import { useState, useEffect } from 'react';
import personServices from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('Add a new name');
  const [newNumber, setNewNumber] = useState('Add number');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const personsToShow =
    persons && filter !== ''
      ? persons.filter(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) === true
        )
      : persons;

  const addNewPerson = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace old number with new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personServices
          .update(person.id, changedPerson)
          .then((changedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : changedPerson
              )
            )
          );
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };

      personServices.create(person).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </>
  );
};

export default App;
