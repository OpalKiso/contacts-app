import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactCard from './ContactCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'C:/Users/Samsung/contacts-app/src/contacts.css'; // Replace with your CSS file path

const ContactsList = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingRandom, setIsAddingRandom] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contacts'); 
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  //random contact function
  const handleAddRandomContact = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const newContact = {
        id: Date.now(),
        name: `${response.data.results[0].name.title} ${response.data.results[0].name.first}`,
        phoneNumber: response.data.results[0].phone,
        picture: `https://randomuser.me/api/portraits/${response.data.results[0].gender}/${response.data.results[0].picture.large}`,
      };
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      setContacts([...contacts, newContact]);

      try {
        //poasting the random contact (adding to the contact array)
        await axios.post('http://localhost:5000/api/contacts', newContact); 
      } catch (error) {
        console.error(error);
        setContacts(contacts.filter((c) => c.id !== newContact.id));
      } finally {
        setIsAddingRandom(false); 
      }
    } catch (error) {
      console.error(error);
      setIsAddingRandom(false); 
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="contact-container">
      <div className="search-input">
        <input
          type="text"
          placeholder="search in contacts..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
      <div className="contacts-container">
        <h2>Contacts</h2>
        <ul>
        {contacts.length > 0 ? ( 
          filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact}  />
          ))
        ) : (
          <li>No contacts yet.</li> 
        )}
        </ul>
      </div>
      <div className="contact-new">
      <button type="button" className="refresh-photo-button" onClick={handleAddRandomContact}>Random Contact</button>

        <Link to="/contacts/new">New Contact</Link>
      </div>
    </div>
  );
};

export default ContactsList;
