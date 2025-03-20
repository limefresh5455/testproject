// src/lib/utils/validation.js

export const ChatWithUsValidateForm = ({ firstName, lastName, email, message }) => {
    const errors = {};
    let isValid = true
  
    // Validate First Name
    if (!firstName || firstName.trim() === '') {
      errors.firstName = '*First name is required.';
      isValid=false
    }  
  
    // Validate Last Name
    if (!lastName || lastName.trim() === '') {
      errors.lastName = '*Last name is required.';
      isValid=false
    } 
  
    // Validate Email
    if (!email || email.trim() === '') {
      errors.email = '*Email is required.';
      isValid=false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = '*Invalid email format.';
      isValid=false
    }
  
    // Validate Message
    if (!message || message.trim() === '') {
      errors.message = '*Message cannot be empty.';
      isValid=false
    }  
  
    return {isValid,errors};
};
  


export const NewsLetterValidateForm = ({ firstName, lastName, email }) => {
  const errors = {};
  let isValid = true

  // Validate First Name
  if (!firstName || firstName.trim() === '') {
    errors.firstName = '*First name is required.';
    isValid=false
  }  

  // Validate Last Name
  if (!lastName || lastName.trim() === '') {
    errors.lastName = '*Last name is required.';
    isValid=false
  } 

  // Validate Email
  if (!email || email.trim() === '') {
    errors.email = '*Email is required.';
    isValid=false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '*Invalid email format.';
    isValid=false
  }


  return {isValid,errors};
};


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const validateLogin = (loginData) => {
  const errors = {};
  let isValid = true;

  if (!loginData.email) {
      errors.email = '*Email is required';
      isValid = false;
  } else if (!isValidEmail(loginData.email)) {
      errors.email = '*Invalid email format';
      isValid = false;
  }

  if (!loginData.password) {
      errors.password = '*Password is required';
      isValid = false;
  }else if (loginData.password.length < 6) {
      errors.password = '*Password must be at least 6 characters long';
      isValid = false;
  }

  return { isValid, errors };
};

export const validateRegister = (registerData) => {
  const errors = {};
  let isValid = true;

  if (!registerData.firstName) {
      errors.firstName = '*First name is required';
      isValid = false;
  }

  if (!registerData.lastName) {
      errors.lastName = '*Last name is required';
      isValid = false;
  }

  if (!registerData.otherName) {
      errors.otherName = '*Other name is required';
      isValid = false;
  }

  if (!registerData.email) {
      errors.email = '*Email is required';
      isValid = false;
  } else if (!isValidEmail(registerData.email)) {
      errors.email = '*Invalid email format';
      isValid = false;
  }

  if (!registerData.phone) {
      errors.phone = '*Phone number is required';
      isValid = false;
  }

  if (!registerData.password) {
      errors.password = '*Password is required';
      isValid = false;
  }else if (registerData.password.length < 6) {
      errors.password = '*Password must be at least 6 characters long';
      isValid = false;
  }

  if (!registerData.confirmPassword) {
      errors.confirmPassword = '*Confirm Password is required';
      isValid = false;
  }else if (registerData.confirmPassword.length < 6) {
      errors.confirmPassword = '*ConfirmPassword must be at least 6 characters long';
      isValid = false;
  } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = '*Passwords do not match';
      isValid = false;
  }

  return { isValid, errors };
};



export const AddAFriendValidateForm = (registerData) => {
  const errors = {};
  let isValid = true;

  if (!registerData.firstName) {
      errors.firstName = '*First name is required';
      isValid = false;
  }

  if (!registerData.lastName) {
      errors.lastName = '*Last name is required';
      isValid = false;
  }

  if (!registerData.otherName) {
      errors.otherName = '*Other name is required';
      isValid = false;
  }

  if (!registerData.email) {
      errors.email = '*Email is required';
      isValid = false;
  } else if (!isValidEmail(registerData.email)) {
      errors.email = '*Invalid email format';
      isValid = false;
  }

  if (!registerData.phone) {
      errors.phone = '*Phone number is required';
      isValid = false;
  }

  return { isValid, errors };
};