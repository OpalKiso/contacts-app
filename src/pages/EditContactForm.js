import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'C:/Users/Samsung/contacts-app/src/contacts.css';

const EditContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState('men'); 


  // generte random photo function
  const generateRandomPhoto = () => {
    const randomGender = Math.random() < 0.5 ? 'men' : 'women'; 
    const randomNumber = Math.floor(Math.random() * 100); 
    const photoUrl = `https://randomuser.me/api/portraits/${randomGender}/${randomNumber}.jpg`;
    setGender(randomGender); 
    document.getElementById('avatar-img').src = photoUrl; 
  };

  useEffect(() => {
    setIsLoading(true); 

    // connect to the getconatctbyid function
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contacts/${id}`); 
        if (response.status === 200) {
          setContact(response.data);
        } else {
          setError('Error fetching contact: ' + response.statusText); 
        }
      } catch (error) {
        console.error('Error fetching contact from server:', error);
        setError(<span style={{ color: 'red' }}>איש הקשר הנבחר אינו קיים</span>);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contact) {
      return; 
    }

    setIsLoading(true); 

    try {
      // connection to the update function
      const response = await axios.put(
        `http://localhost:5000/api/contacts/edit/${contact.id}`,
        contact 
      ); 
      if (response.status === 200) {
        navigate('/contacts'); 
        alert('Contact updated successfully!');
      } else {
        setError('Error updating contact: ' + response.statusText); 
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Error updating contact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Edit Contact</h2>
      <img id="avatar-img" src="https://randomuser.me/api/portraits/men/81.jpg" alt="Random avatar" />
      <button onClick={generateRandomPhoto}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
        <h3>refresh picture</h3>
      </button>
      {isLoading ? (
        <p>Loading contact...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : contact ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contact?.name || ''} 
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={contact?.phoneNumber || ''} 
            onChange={handleChange}
            required
          />

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={contact?.title || ''} 
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Save</button>
          <button className="button-cancel" onClick={() => navigate('/contacts')}>
            Cancel
          </button>
        </form>
      ) : (
        <p>Contact not found.</p>
      )}
    </div>
  );
};

export default EditContactForm;
