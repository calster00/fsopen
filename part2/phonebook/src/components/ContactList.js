import React from "react";

const ContactList = ({ persons, searchTerm }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchTerm))
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
