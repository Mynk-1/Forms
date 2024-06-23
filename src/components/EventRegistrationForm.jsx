import React, { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest === 'yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'no',
    guestName: '',
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, validate);

  const [showGuestName, setShowGuestName] = useState(false);

  useEffect(() => {
    setShowGuestName(values.attendingWithGuest === 'yes');
  }, [values.attendingWithGuest]);

  const submitForm = () => {
    alert(`Form submitted successfully!\n
      Name: ${values.name}\n
      Email: ${values.email}\n
      Age: ${values.age}\n
      Attending with Guest: ${values.attendingWithGuest}\n
      Guest Name: ${values.guestName}`);
  };

  return (
    <div className="p-10 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Event Registration Form</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="attendingWithGuest" className="block text-sm font-medium text-gray-700">
              Are you attending with a guest?
            </label>
            <select
              id="attendingWithGuest"
              name="attendingWithGuest"
              value={values.attendingWithGuest}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {showGuestName && (
            <div className="mb-4">
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
                Guest Name:
              </label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.guestName && <p className="text-red-500 text-xs mt-1">{errors.guestName}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
