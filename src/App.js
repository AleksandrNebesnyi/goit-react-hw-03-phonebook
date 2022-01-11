import { Component } from 'react';
import Container from './components/Container/Container.jsx';
import Section from './components/Section/Section.jsx';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import ContactsFilter from './components/ContactsFilter/ContactsFilter.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [
      // {
      //   id: "c7a273d-8bfr-66gr-wef2-4f4d57ea2d0",
      //   name: "Rosie Simpson",
      //   number: "459-12-56",
      // },
      // {
      //   id: "anctrjd-8bfr-66gr-wef2-4f4d57ea2d0",
      //   name: "Hermione Kline",
      //   number: "443-89-12",
      // },
      // {
      //   id: "dkt846a-8bfr-66gr-wef2-4f4d57ea2d0",
      //   name: "Eden Clements",
      //   number: "645-17-79",
      // },
      // {
      //   id: "hr7y3td-8bfr-66gr-wef2-4f4d57ea2d0",
      //   name: "Annie Copeland",
      //   number: "227-91-26",
      // },
    ],
    filter: '',
  };

  // Вызывается после каждого обновления!
  // Сравнивает стейты, и если не равны, тогда пишет в localStorage

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  //  Вызывается один раз при маунте!
  //  Cчитывает при маунте localStorage и записывает в стейт
  componentDidMount() {
    const getContacts = JSON.parse(localStorage.getItem('contacts'));
    if (getContacts.length > 0) {
      this.setState({ contacts: getContacts });
    } else {
      toast.info('No save contacts');
    }
  }

  // Добавляет контакт
  addContact = newContact => {
    // Проверка на дубликат
    const duplicateName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );
    if (duplicateName) {
      toast.warn(`${newContact.name} is already on contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  // Следит за полем фильтрации и пишет в стейт
  changeFilter = event => {
    event.preventDefault();
    this.setState({ filter: event.currentTarget.value });
  };

  // Фильтрует и возвращает результат фильтра
  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter),
      );
    } else {
      return contacts;
    }
  };

  // Удаляет контакт
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <ContactsFilter
            filter={this.state.filter}
            onFilter={this.changeFilter}
          />
          <ContactList
            contacts={this.filterContacts()}
            onDeleteContact={this.deleteContact}
          />
        </Section>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

export default App;
