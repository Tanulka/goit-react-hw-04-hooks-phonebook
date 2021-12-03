import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts.jsx';
import Filter from '../Filter/Filter.jsx';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const checkUser = contact => {
    return contacts.some(person => person.name.toLowerCase() === contact.name.toLowerCase());
  };

  const handleSubmit = contact => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const filtrate = () => {
    console.log('filter: ', filter);
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <Form handleSubmit={handleSubmit} checkUser={checkUser} />
      <h2>Contacts</h2>
      <Filter handleChange={handleChange} value={filter} />

      <Contacts contacts={filter ? filtrate() : contacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
