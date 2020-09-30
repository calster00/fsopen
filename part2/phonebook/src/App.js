import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName) return;

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    contactService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputValue={searchTerm} onChange={handleFilterChange} />
      <h3>Add new contact</h3>
      <AddContactForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ContactList persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
