import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/OAuth';
import { useTranslation } from "react-i18next";


const DevSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'developer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      role: 'developer',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      navigate('/sign-in');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (



    // <div
    //   className="relative bg-cover bg-center min-h-screen"
    //   style={{
    //     backgroundImage: `url('https://oleadev.com/wp-content/uploads/2021/09/real-estate-developer-acquistion-1024x614.jpeg')`,
    //   }}
    // >

    //   <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">

    //     <div className='flex flex-col items-center justify-center min-h-screen'>
    //       <div className='max-w-xl w-full p-12 bg-white rounded-lg shadow-lg'>
    //         <h1 className='text-3xl text-center font-bold mb-5 text-gray-800'>
    //           Sign Up for Developer
    //         </h1>
    //         <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
    //           <div className='flex flex-col'>
    //             <label htmlFor='username' className='text-gray-700'>
    //               Username
    //             </label>
    //             <input
    //               type='text'

    //               placeholder='Enter your username'
    //               className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
    //               id='username'
    //               value={formData.username}
    //               onChange={handleChange}
    //             />
    //           </div>

    //           <div className='flex flex-col'>
    //             <label htmlFor='email' className='text-gray-700'>
    //               Email
    //             </label>
    //             <input
    //               type='email'
    //               placeholder='Enter your email'
    //               className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
    //               id='email'
    //               value={formData.email}
    //               onChange={handleChange}
    //             />
    //           </div>

    //           <div className='flex flex-col'>
    //             <label htmlFor='password' className='text-gray-700'>
    //               Password
    //             </label>
    //             <input
    //               type='password'
    //               placeholder='Enter your password'
    //               className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
    //               id='password'
    //               value={formData.password}
    //               onChange={handleChange}
    //             />
    //           </div>

    //           <button
    //             disabled={loading}
    //             className='bg-black text-white p-3 font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    //             type='submit'
    //           >
    //             {loading ? 'Loading...' : 'Sign Up'}
    //           </button>
    //         </form>

    //         <div className='flex items-center justify-center mt-8 text-gray-600'>
    //           <p>Already have an account?</p>
    //           <Link to='/sign-in' className='text-yellow-600 font-semibold underline ml-2'>
    //             Sign in
    //           </Link>
    //         </div>
    //       </div>

    //       {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    //       {success && <p className='text-green-500 mt-5 text-center'>Signup successful! Please sign in.</p>}
    //     </div>
    //   </div>

    // </div>






    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('https://oleadev.com/wp-content/uploads/2021/09/real-estate-developer-acquistion-1024x614.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-xl w-full p-12 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-bold mb-5 text-gray-800">
            {t("sign_up_dev")}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <label htmlFor="username"
                className={`text-gray-700 ${i18n.language === 'ar' ? 'text-xl' : 'text-base'}`}
              >
                {t("username")}
              </label>
              <input
                type="text"
                placeholder={t("enter_username")}
                className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <label htmlFor="email"
                className={`text-gray-700 ${i18n.language === 'ar' ? 'text-xl' : 'text-base'}`}>
                {t("e-mail")}
              </label>
              <input
                type="email"
                placeholder={t("enter_email")}
                className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <label htmlFor="password"
                className={`text-gray-700 ${i18n.language === 'ar' ? 'text-xl' : 'text-base'}`}>
                {t("pass")}
              </label>
              <input
                type="password"
                placeholder={t("enter_pass")}
                className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* <button
              disabled={loading}
              className="bg-black text-white p-3 font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              type="submit"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button> */}
            <button

              disabled={loading}
              className="bg-black text-white p-3 font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              type="submit"            >
              {loading
                ? (isArabic ? '... جاري التحميل' : 'Loading...')
                : (isArabic ? 'إنشاء حساب جديد' : 'Sign Up')}
            </button>
          </form>

          <div className="flex items-center justify-center mt-8 text-gray-600" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            <p>{t("have_account")}{' '}</p>
            <Link to="/sign-in" className="text-yellow-600 font-semibold underline ml-2">
              {t("sign_in")}
            </Link>
          </div>

          {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-5 text-center">Signup successful! Please sign in.</p>}
        </div>
      </div>
    </div>

  );
};

export default DevSignUp;
