
const contactsReducer = (state = [], action) => {
    switch (action.type) {
      case 'DELETE_CONTACT':
        return state.filter(contact => contact.id !== action.payload);
      default:
        return state;
    }
  };