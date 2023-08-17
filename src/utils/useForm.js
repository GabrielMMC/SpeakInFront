import { useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Handles changes to form fields and updates the form state accordingly
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    resetError(name);
  };

  // Identifies errors according to the field value
  const handleBlur = (event) => {
    const { name, value, maxLength, minLength } = event.target
    const whiteSpace = value.match(/ /g)?.length ?? 0

    if (!value) setErrors({ ...errors, [name]: `Campo em branco` })
    if (minLength > 0) {
      if (value.length < minLength + whiteSpace) setErrors({ ...errors, [name]: `São necessários ${minLength} caracteres` })
    } else {
      if (value.length < maxLength) setErrors({ ...errors, [name]: `São necessários ${maxLength} caracteres` })
    }
  }

  // Handles changes to file input fields and updates the form state with the selected file and its URL
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    generateImageUrl(file, (url) => {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: { value: file, url },
      }));
    });
  };

  // Reads a file using the FileReader API and generates a URL for the file
  const generateImageUrl = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Sets the value of a form field
  const setField = (fieldName, fieldValue) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: fieldValue,
    }));
  };

  // Sets an error message for a form field
  const setError = (fieldName, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  // Resets the error message for a form field
  const resetError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: null,
    }));
  };

  // Resets the form state and error messages
  const resetForm = () => {
    setForm(initialState);
    setErrors({});
  };

  // Define a function called `isValid` that takes an array of `ignoredFields` as a parameter.
  const isValid = (ignoredFields) => {
    // Initialize `validStatus` as true.
    let validStatus = true;
    // Iterate through all the fields in the `form` object.
    Object.keys(form).forEach((fieldName) => {
      // Get the field value, maximum, and minimum length.
      const fieldValue = form[fieldName];
      const maxLength = document.getElementById(fieldName)?.maxLength ?? 0;
      const minLength = document.getElementById(fieldName)?.minLength ?? 0;
      // Check if the field is a string.
      if (typeof fieldValue !== 'object') {
        // Check if the field is in the `ignoredFields` array.
        if (!ignoredFields.includes(fieldName)) {
          // Check if the field value is empty or whitespace.
          if (!fieldValue || fieldValue.trim() === '') {
            validStatus = false;
            setError(fieldName, 'Campo em branco');
          }
          // Check if the field value is longer than the maximum length.
          if (fieldValue.length < maxLength || fieldValue.length < minLength) {
            validStatus = false;
            setError(fieldName, `São necessários ${maxLength} caracteres`);
          }
        }
      }
      // Check if the field is not a string and is empty or whitespace.
      else if ((!fieldValue) && !ignoredFields.includes(fieldName)) {
        validStatus = false;
        setError(fieldName, 'Campo em branco');
      }
    });
    // Return the `validStatus`.
    return validStatus;
  };


  // Returns the current form state
  const getFormData = () => {
    return form;
  };

  // Validates the type of a form field value against a regular expression and sets an error message if the validation fails
  const validateFieldType = (fieldName, regex, errorMessage) => {
    const fieldValue = form[fieldName];
    if (fieldValue && !fieldValue.match(regex)) {
      setError(fieldName, errorMessage);
      return false;
    }
    return true;
  };


  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    handleFileChange,
    generateImageUrl,
    setField,
    setError,
    resetError,
    resetForm,
    isValid,
    getFormData,
    validateFieldType,
    handleBlur
  };
};

export default useForm;
