const express = require('express');
const controllers = require('../Controllers/controllers');

const router = express.Router();

// GET /api/contacts - det all contacts
router.get('/contacts', controllers.getAllContacts);

// GET /api/contacts/:id - det a contact by ID
router.get('/contacts/:id', controllers.getContactById);

// POST /api/contacts - create a new contact
router.post('/contacts', controllers.createContact);

// PUT /api/contacts/edit/:id - update a contact
router.put('/contacts/edit/:id', controllers.updateContact);

// DELETE /api/contacts/:id - delete a contact
router.delete('/contacts/:id', controllers.deleteContact);

module.exports = router;
