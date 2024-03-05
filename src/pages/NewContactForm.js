import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validate from '../validation';
import axios from 'axios'
import 'C:/Users/Samsung/contacts-app/src/contacts.css';


const NewContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('men'); 

  //genere random photo function the same in the edit
  const generateRandomPhoto = () => {
    const randomGender = Math.random() < 0.5 ? 'men' : 'women'; 
    const randomNumber = Math.floor(Math.random() * 100); 
    const photoUrl = `https://randomuser.me/api/portraits/${randomGender}/${randomNumber}.jpg`;
    setGender(randomGender); 
    document.getElementById('avatar-img').src = photoUrl; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(phoneNumber);
  
    
    const errors = validate({ name, phoneNumber, title }); 
    console.log(phoneNumber);
  
  
    if (errors.length === 0) {
      try {
        // connect to the backend create function
        const response = await axios.post('http://localhost:5000/api/contacts', {
          name: name.trim(), 
          phoneNumber: phoneNumber.trim(), 
          title: title.trim(), 
        });
        console.log(phoneNumber);
  
        console.log('Contact created successfully:', response.data);
        dispatch({ type: 'ADD_CONTACT', payload: response.data });
        navigate('/contacts');
        alert('Contact created successfully!');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Validation errors:', errors);
    }
  };
  


  const handlePhoneNumberChange = (event) => {
    const sanitizedPhoneNumber = event.target.value.replace(/[^0-9\-+]*/g, '');
    setPhoneNumber(sanitizedPhoneNumber);
  };

  return (
    <div className="new-contact-container">
      <div className="new-contact-avatar">
        <img id="avatar-img" src="https://randomuser.me/api/portraits/men/81.jpg" alt="Random avatar" />
        <button onClick={generateRandomPhoto}>
          <i className="fa fa-refresh" aria-hidden="true"></i>
          <h3>refresh picture</h3>
        </button>
      </div>
      <div className="new-contact-inputs">
        <div className="new-contact-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 30))}
          />
          {name.length > 30 && <p style={{ color: 'red' }}>Name cannot exceed 30 characters</p>}
        </div>
        <div className="new-contact-input">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phonenumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="new-contact-input">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
      <div className="new-contact-buttons">
        <button className="button-ok" type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button className="button-cancel" onClick={() => navigate('/contacts')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewContactForm;
