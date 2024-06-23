import React, { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
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
    setValues,
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.fullName) errors.fullName = 'Full Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (!/^\d+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be a valid number';
  }
  if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = 'Relevant Experience is required';
  } else if ((values.position === 'Developer' || values.position === 'Designer') && (isNaN(values.relevantExperience) || values.relevantExperience <= 0)) {
    errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
  }
  if (values.position === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = 'Portfolio URL is required';
  } else if (values.position === 'Designer' && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'Portfolio URL is invalid';
  }
  if (values.position === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Management Experience is required';
  }
  if (!values.additionalSkills || values.additionalSkills.length === 0) {
    errors.additionalSkills = 'At least one skill must be selected';
  }
  if (!values.preferredInterviewTime) {
    errors.preferredInterviewTime = 'Preferred Interview Time is required';
  } else if (isNaN(Date.parse(values.preferredInterviewTime))) {
    errors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
  }
  return errors;
};

const JobApplicationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: 'Developer',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm(initialValues, validate);

  const [showRelevantExperience, setShowRelevantExperience] = useState(false);
  const [showPortfolioUrl, setShowPortfolioUrl] = useState(false);
  const [showManagementExperience, setShowManagementExperience] = useState(false);

  useEffect(() => {
    setShowRelevantExperience(values.position === 'Developer' || values.position === 'Designer');
    setShowPortfolioUrl(values.position === 'Designer');
    setShowManagementExperience(values.position === 'Manager');
  }, [values.position]);

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    setValues((prevValues) => {
      const newSkills = checked
        ? [...prevValues.additionalSkills, name]
        : prevValues.additionalSkills.filter(skill => skill !== name);
      return { ...prevValues, additionalSkills: newSkills };
    });
  };

  const submitForm = () => {
    alert(`Form submitted successfully!\n
      Full Name: ${values.fullName}\n
      Email: ${values.email}\n
      Phone Number: ${values.phoneNumber}\n
      Position: ${values.position}\n
      Relevant Experience: ${values.relevantExperience}\n
      Portfolio URL: ${values.portfolioUrl}\n
      Management Experience: ${values.managementExperience}\n
      Additional Skills: ${values.additionalSkills.join(', ')}\n
      Preferred Interview Time: ${values.preferredInterviewTime}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Job Application Form</h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="position" className="text-sm font-medium">
              Applying for Position
              <select
                id="position"
                name="position"
                value={values.position}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </label>
          </div>
          {showRelevantExperience && (
            <div className="flex flex-col">
              <label htmlFor="relevantExperience" className="text-sm font-medium">
                Relevant Experience (years)
                <input
                  type="number"
                  id="relevantExperience"
                  name="relevantExperience"
                  value={values.relevantExperience}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.relevantExperience ? 'border-red-500' : ''}`}
                />
                {errors.relevantExperience && <p className="text-red-500 text-xs mt-1">{errors.relevantExperience}</p>}
              </label>
            </div>
          )}
          {showPortfolioUrl && (
            <div className="flex flex-col">
              <label htmlFor="portfolioUrl" className="text-sm font-medium">
                Portfolio URL
                <input
                  type="text"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={values.portfolioUrl}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.portfolioUrl ? 'border-red-500' : ''}`}
                />
                {errors.portfolioUrl && <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl}</p>}
              </label>
            </div>
          )}
          {showManagementExperience && (
            <div className="flex flex-col">
              <label htmlFor="managementExperience" className="text-sm font-medium">
                Management Experience
                <input
                  type="text"
                  id="managementExperience"
                  name="managementExperience"
                  value={values.managementExperience}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.managementExperience ? 'border-red-500' : ''}`}
                />
                {errors.managementExperience && <p className="text-red-500 text-xs mt-1">{errors.managementExperience}</p>}
              </label>
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Additional Skills
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="JavaScript"
                    checked={values.additionalSkills.includes('JavaScript')}
                    onChange={handleSkillChange}
                    className="mr-2"
                  />
                  JavaScript
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="CSS"
                    checked={values.additionalSkills.includes('CSS')}
                    onChange={handleSkillChange}
                    className="mr-2"
                  />
                  CSS
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Python"
                    checked={values.additionalSkills.includes('Python')}
                    onChange={handleSkillChange}
                    className="mr-2"
                  />
                  Python
                </label>
              </div>
              {errors.additionalSkills && <p className="text-red-500 text-xs mt-1">{errors.additionalSkills}</p>}
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="preferredInterviewTime" className="text-sm font-medium">
              Preferred Interview Time
              <input
                type="datetime-local"
                id="preferredInterviewTime"
                name="preferredInterviewTime"
                value={values.preferredInterviewTime}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.preferredInterviewTime ? 'border-red-500' : ''}`}
              />
              {errors.preferredInterviewTime && <p className="text-red-500 text-xs mt-1">{errors.preferredInterviewTime}</p>}
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
