import React from 'react';
import ContactUsForm from '../components/core/AboutPage/ContactForms';

const Contact = () => {
  return (
    <div className='bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 mx-auto my-10'>
      <h1 className='text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-4'>
        Contact Us
      </h1>
      <p className='text-md md:text-lg text-center text-white mb-6'>
        We value your feedback and Query!  Please fill out the form below, and we will get back to you shortly.
      </p>
      <ContactUsForm />
    </div>
  );
};

export default Contact;
