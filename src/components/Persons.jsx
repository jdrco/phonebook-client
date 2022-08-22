import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          removePerson={removePerson}
          id={person.id}
        />
      ))}
    </div>
  );
};

export default Persons;
