import React from 'react';
import HighlightText from '../components/common/HighlightText';
import chat from '../asset/Images/chat.png';
import ev1 from "../asset/Images/ev1.jpg";
import e2 from "../asset/Images/e2.jpg";
import e3 from "../asset/Images/e3.jpg";
import Quote from '../components/core/AboutPage/Quote';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactUsForm from '../components/core/AboutPage/ContactForms';

const About = () => {
  return (
    <div className='mx-auto mt-[100px] text-white w-11/12 max-w-maxContent'>

      {/* Section 1: Introduction */}
      <section>
        <div>
          <header className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold'>
            The <HighlightText text={'Nexier'} /> is an online directory that connects people & promote to sell old Items.

            </h1>
            {/* <h1 className='text-3xl md:text-4xl font-bold'>
              Welcome to The Nexier - Driving Innovation in Campus "Old" Item Selling for a <HighlightText text={"Brighter Future"} />
            </h1> */}
            <p className='text-lg md:text-xl mt-6 text-center text-gray-200 font-medium leading-relaxed'>
              <p className='text-lg md:text-xl mt-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 shadow-md tracking-wide'>
                You can use The Nexier to:
              </p>

              <ul className='list-disc list-inside mt-4 space-y-4 text-left md:text-lg'>
                <li className='text-lg md:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 font-sans-serif tracking-wide hover:text-white'>
                  <span className='font-semibold text-white'>Search for people at DBATU</span>
                </li>
                <li className='text-lg md:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 font-sans-serif tracking-wide hover:text-white'>
                  <span className='font-semibold text-white'>Find out who is in your classes / department</span>
                </li>
                <li className='text-lg md:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 font-sans-serif tracking-wide hover:text-white'>
                  <span className='font-semibold text-white'>Look up your friends' friends</span>
                </li>
                <li className='text-lg md:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105 font-sans-serif tracking-wide hover:text-white'>
                  <span className='font-semibold text-white'>Sell your old items to your juniors</span>
                </li>
              </ul>
            </p>
          </header>
          <div className='flex flex-wrap justify-center gap-5'>
            <img className='w-[250px] md:w-[300px] lg:w-[400px] rounded-lg border-4 border-gray-600 shadow-xl' src={ev1} alt='Item 1' />
            <img className='w-[250px] md:w-[300px] lg:w-[400px] rounded-lg border-4 border-gray-600 shadow-xl' src={e2} alt='Item 2' />
            <img className='w-[250px] md:w-[300px] lg:w-[400px] rounded-lg border-4 border-gray-600 shadow-xl' src={e3} alt='Item 3' />
          </div>
        </div>
      </section>

      {/* Section 2: Meet the Creator */}
{/*       <section className='my-16 bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h2 className='text-xl md:text-2xl font-bold mb-4'>Meet the Creator</h2>
        <p className='text-md md:text-lg'>
    "I’m Prathamesh Jadhav, a 3rd-year IT student at Dr. Babasaheb Ambedkar Technological University, Lonere. Driven by a passion for technology, I created this platform to make campus life more efficient and help students connect and trade academic resources easily."
        </p>
      </section> */}

      {/* Section 3: Founding Story */}
      <section className='mb-16'>
        <div className='flex flex-col lg:flex-row items-center gap-10'>

          {/* Founding Story Text */}
          <div className='lg:w-1/2'>
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>
              Our Founding Story
            </h1>
            <p className='text-md md:text-lg'>
              This platform began with the idea that students should have an easy way to buy and sell items like calculators, drafters, and other academic tools at affordable prices. We recognized the need for an accessible, flexible platform for students from all branches.
            </p>
          </div>

          {/* Founding Story Image */}
          <div className='lg:w-1/2'>
            <img src={chat} className='rounded-lg border-4 border-gray-600 shadow-xl w-full h-auto' alt='Founding Story Image' />
          </div>
        </div>
      </section>

      {/* Section 4: Vision & Mission */}
      <section className='mb-16'>
        <div className='flex flex-col lg:flex-row gap-10'>

          {/* Vision */}
          <div className='lg:w-1/2'>
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>Our Vision</h1>
            <p className='text-md md:text-lg'>
              With a clear vision, I set out to create a platform that would transform the way students engage in buying and selling. Our goal is to make trading simple, reliable, and accessible for everyone on campus.
            </p>
          </div>

          {/* Mission */}
          <div className='lg:w-1/2'>
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>Our Mission</h1>
            <p className='text-md md:text-lg'>
              Our mission is to build a vibrant campus community where students can easily connect, negotiate, and trade academic items, promoting collaboration and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Quote */}
      <section className='my-16'>
        <div>
          <Quote />
        </div>
      </section>

      {/* Section 6: Learning Grid & Contact Form */}
      <section className='mx-auto flex flex-col gap-10 items-center justify-center mb-[140px]'>
        <LearningGrid />
        <ContactUsForm />
      </section>
      </div>
    );
};

export default About;
