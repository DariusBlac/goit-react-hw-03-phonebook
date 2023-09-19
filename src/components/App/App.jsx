import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormCreateContact } from 'components/Forms/FormCreateContact';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

const INITIAL_STATE = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...INITIAL_STATE],
    filter: '',
  };

  createContact = body => {
    const isAlreadyExist = this.state.contacts.find(
      el => el.name.toLowerCase() === body.name.toLowerCase()
    );
    if (isAlreadyExist)
      return alert(`${isAlreadyExist.name} is already in contacts`);
    const newContact = { ...body, id: nanoid() };
    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  filterContact = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    let filteredContacts = null;
    filteredContacts = this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
    return (
      <div className={css.container}>
        <h1>Phone book</h1>
        <FormCreateContact createContact={this.createContact} />

        <h2>Contacts</h2>
        <Filter filterContact={this.filterContact} />

        {filteredContacts ? (
          <ContactList
            array={filteredContacts}
            handleDelete={this.handleDelete}
          />
        ) : (
          <ContactList
            array={this.state.contacts}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}
