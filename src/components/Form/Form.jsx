import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Form.module.css';

function Form({ checkUser, handleSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const contact = { name, number };

    if (checkUser(contact)) {
      alert(`${name} is already in contacts`);
      return;
    }
    handleSubmit(contact);
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setNumber('');
  };

  function onInputChange(e, setter) {
    setter(e.target.value);
  }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => onInputChange(e, setName)}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          <p>Number</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={e => onInputChange(e, setNumber)}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </section>
  );
}

Form.propTypes = {
  checkUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
