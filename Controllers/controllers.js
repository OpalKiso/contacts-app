const Contact = require('../models/contactController')

const contacts = []; // 

// generate ID for new contacts
function generateId() {
  return Math.max(...contacts.map(c => c.id), 0) + 1;
}

// GET req - get all contacts
function getAllContacts(req, res) {
  res.status(200).json(contacts);
}
 
// GET req - get contact by ID
function getContactById(req, res) {
    const id = req.params.id;
    const index = contacts.findIndex(c => c.id === parseInt(id));
  
    if (index !== -1) {
      res.status(200).json(contacts[index]);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  }

// POST req - create a new contact
const fs = require('fs');

function createContact(req, res) {
    const { name, phoneNumber ,title} = req.body;
    const newContact = new Contact(generateId(), name,  phoneNumber, title);
    contacts.push(newContact);
    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    console.log("Contact created successfully");
    console.log(contacts);
  }
  


// PUT req - update an existing contact
function updateContact(req, res) {
  const id = req.params.id;
  const { name, phoneNumber, title} = req.body;
  const index = contacts.findIndex(c => c.id === parseInt(id));

  if (index !== -1) {
    contacts[index] = { ...contacts[index], name, phoneNumber,title };
    res.status(200).json({ message: 'Contact updated successfully', contact: contacts[index] });
    console.log('contact update' + contacts[index]);
  } else {
    res.status(404).json({ message: 'Contact not found' });
    console.log("tried to update");
  }
}

// DELETE req - delete a contact
function deleteContact(req, res) {
  const id = req.params.id;
  const index = contacts.findIndex(c => c.id === parseInt(id));

  if (index !== -1) {
    contacts.splice(index, 1);
    res.status(200).json({ message: 'Contact deleted successfully' });
    console.log(contacts.id +"deletetd");
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
}

console.log(contacts);


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
