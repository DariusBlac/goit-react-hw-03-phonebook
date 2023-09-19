import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormCreateContact } from 'components/Forms/FormCreateContact';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const LOCAL_CONTACTS = localStorage.getItem('contacts');
    if (LOCAL_CONTACTS) {
      this.setState({ contacts: JSON.parse(LOCAL_CONTACTS) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
