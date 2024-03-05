const validate = (data) => {
    const errors = [];
  
    if (!data.name) {
      errors.push('Name is required');
    } else if (data.name.length > 30) {
      errors.push('Name cannot exceed 30 characters');
    }
  
    if (!data.phoneNumber) {
      errors.push('Phone number is required');
    } else if (!/^\d+(-\d+)?$/.test(data.phoneNumber)) {
      errors.push('Invalid phone number format');
    }
  
    return errors;
  };
  
  export default validate;
  