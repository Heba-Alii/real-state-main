import React from 'react';
import Footer from './Footer';

export default function About() {
  return (
    <section >
      <main
        //         style={{
        //           backgroundImage: `url('https://res.cloudinary.com/dh1lgpmm4/image/upload/v1698664691/AlaaProjects/ARREALSTATE/arabian-ranches-27-7-2020-1024x640_1_u8muxf.jpg')`,
        //         }}
        //         className='bg-cover bg-center bg-no-repeat min-h-screen m-0'
        //       >

        //         <div className='bg-cover bg-center sm:py-20 px-4 max-w-6xl mx-auto relative'>

        //   <div className='relative bg-black bg-opacity-60 p-8 rounded-lg text-white z-10'>

        //     <div className='flex justify-center items-center mb-4'>
        //   <img
        //     src='https://res.cloudinary.com/dusfhr8a4/image/upload/f_auto,q_auto/um3c2nygafj21nxg381s'
        //     alt='A.R Estate Logo'
        //     className='mr-4 w-12 h-12'
        //   />
        //   <h1 className='text-3xl font-bold text-center'>
        //     About AR Estate
        //   </h1>
        // </div>

        //     <p className='mb-4'>
        //       AR Estate is a leading real estate agency that specializes in
        //       helping clients buy, sell, and rent properties in the most
        //       desirable neighborhoods. Our team of experienced agents is
        //       dedicated to providing exceptional service and making the buying
        //       and selling process as smooth as possible.
        //     </p>
        //     <p className='mb-4'>
        //       Our mission is to help our clients achieve their real estate goals
        //       by providing expert advice, personalized service, and a deep
        //       understanding of the local market. Whether you are looking to buy,
        //       sell, or rent a property, we are here to help you every step of the
        //       way.
        //     </p>
        //     <p className='mb-4'>
        //       Our team of agents has a wealth of experience and knowledge in the
        //       real estate industry, and we are committed to providing the highest
        //       level of service to our clients. We believe that buying or selling
        //       a property should be an exciting and rewarding experience, and we
        //       are dedicated to making that a reality for each and every one of
        //       our clients.
        //     </p>
        //   </div>
        // </div>
        className="bg-white py-16 px-4 sm:px-8 lg:px-16 text-center">
        <div className="mb-6">
          <img
            src='https://res.cloudinary.com/dusfhr8a4/image/upload/f_auto,q_auto/um3c2nygafj21nxg381s'
            alt='A.R Estate Logo'
            className="mx-auto w-24 h-auto"
          />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">About AR RealEstate</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          We specialize in helping clients buy, sell, and rent in the most desirable neighborhoods,
          offering tailored solutions with expert agents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <img src="https://img.icons8.com/ios-filled/50/d4af37/home.png" alt="Home Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Personalized Service</h3>
            <p className="text-gray-700">
              We guide you through every step, offering personalized advice tailored to your goals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <img src="https://img.icons8.com/ios-filled/50/d4af37/search.png" alt="Search Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Market Experts</h3>
            <p className="text-gray-700">
              Our agents have deep knowledge of the real estate market and provide trustworthy insights.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <img src="https://img.icons8.com/ios-filled/50/d4af37/briefcase.png" alt="Briefcase Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Client Dedication</h3>
            <p className="text-gray-700">
              We are committed to exceptional service and making the experience exciting and rewarding.
            </p>
          </div>
        </div>
      </main>
      <Footer className="fixed bg-opacity-70 inset-x-0 bottom-10 bg-transparent m-0" />
    </section>
  );
}

