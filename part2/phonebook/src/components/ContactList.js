import React from "react";

const ContactList = ({ persons, searchTerm, removePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchTerm))
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
