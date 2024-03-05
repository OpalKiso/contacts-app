import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {

      //conecting to the delete function
      const response = await axios.delete(`http://localhost:5000/api/contacts/${contact.id}`); // Replace with your actual backend URL

      if (response.status === 200) {
        dispatch({ type: 'DELETE_CONTACT', payload: contact.id }); // Dispatch Redux action to update state
      } else {
        console.error('Error deleting contact:', response.data); // Handle potential errors
      }
    } catch (error) {
      console.error('Error deleting contact:', error); // Handle errors
    }
  };

  return (
    <li key={contact.id}>
      <Link to={`/contacts/${contact.id}`}>{contact.name} </Link> - {contact.phoneNumber}
      <button onClick={handleDelete}>X</button>
    </li>
  );
};

export default ContactCard;
