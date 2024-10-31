import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { submitFeedback } from '../../../services/operations/authApi';

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const submitContactForm = async (data) => {

    try {
      setLoading(true);
      const res = submitFeedback(data);

      setLoading(false);
    } catch (e) {
      console.log("error: ", e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      email: "",
      firstname: "",
      lastname: "",
      message: "",
      phoneNo: "",
    });
  }, [reset, isSubmitSuccessful]);

  return (
    <div className='text-white'>
      <form onSubmit={handleSubmit(submitContactForm)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* First Name */}
          <div className='flex flex-col'>
            <label htmlFor='firstname' className='mb-2'>First Name</label>
            <input
              type='text'
              id='firstname'
              className='text-black px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span className='text-red-500'>Please enter your name</span>}
          </div>

          {/* Last Name */}
          <div className='flex flex-col'>
            <label htmlFor='lastname' className='mb-2'>Last Name</label>
            <input
              type='text'
              id='lastname'
              className='text-black px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              {...register("lastname")}
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-col'>
          <label htmlFor='email' className='mb-2'>Email Address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter email address'
            className='text-black px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            {...register("email", { required: true })}
          />
          {errors.email && <span className='text-red-500'>Please enter your email</span>}
        </div>

        {/* Phone Number */}
        <div className='flex flex-col'>
          <label htmlFor='phoneNo' className='mb-2'>Phone Number</label>
          <input
            type='number'
            id='phoneNo'
            placeholder='12345 67890'
            className='text-black px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            {...register("phoneNo", {
              required: { value: true, message: "Please enter phone number" },
              maxLength: { value: 10, message: "Invalid phone number" },
              minLength: { value: 8, message: "Invalid phone number" }
            })}
          />
          {errors.phoneNo && <span className='text-red-500'>{errors.phoneNo.message}</span>}
        </div>

        {/* Message */}
        <div className='flex flex-col'>
          <label htmlFor='message' className='mb-2'>Message</label>
          <textarea
            id='message'
            rows='4'
            placeholder='Enter your message'
            className='text-black px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            {...register("message", { required: true })}
          />
          {errors.message && <span className='text-red-500'>Please enter your message</span>}
        </div>

        <button
          type='submit'
          className='bg-yellow-400 text-black font-bold py-2 px-4 rounded-md transition transform hover:scale-95'
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
