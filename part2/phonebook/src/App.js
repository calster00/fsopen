import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, []);

  const notifyWith = (message, type="success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  };

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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingContact = persons.find((person) => person.name === newName);

    if (existingContact) {
      const confirmDialog = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(confirmDialog)) {
        contactService
          .update(existingContact.id, newPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => {
              return person.id === returnedPerson.id ? returnedPerson : person;
            }));
            setNewName("");
            setNewNumber("");
            notifyWith(`Changed number of  ${existingContact.name}`)
          })
          .catch((error) => {
            notifyWith(
              `Information for ${existingContact.name} has already been removed from the server`,
              "error"
            );
            setPersons(persons.filter(person => person.id !== existingContact.id));
          })
      }
      return;
    }

    contactService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        notifyWith(`Added ${returnedPerson.name}`);
      })
      .catch(error => {
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
  };

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          notifyWith(`Removed ${name}`);
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== id));
          notifyWith(`${name} had already been removed`, "error");
        })
    }
  };

  const personsToShow = searchTerm.length === 0
    ? persons 
    : persons.filter((person) => person.name.toLowerCase().includes(searchTerm));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter 
        inputValue={searchTerm} 
        onChange={handleFilterChange} 
      />
      <h3>Add new contact</h3>
      <AddContactForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ContactList 
        persons={personsToShow}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
