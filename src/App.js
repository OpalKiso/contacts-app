import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContactList from './pages/ContactList';
import NewContactForm from './pages/NewContactForm';
import EditContactForm from './pages/EditContactForm';
import { useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/new" element={<NewContactForm />} />
        <Route path="*" element={<useNavigate to="/contacts" />} />
        <Route path="/contacts/:id" element={<EditContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;