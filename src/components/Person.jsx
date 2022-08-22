import React from 'react';

const Person = ({ name, number, removePerson, id }) => {
  return (
    <>
      <div>
        {name} {number}
        <span>
          {' '}
          <button onClick={() => removePerson(id)}>delete</button>
        </span>
      </div>
    </>
  );
};

export default Person;
