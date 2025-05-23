import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const MicroDeveloperSignUp = () => {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();
  const arabicNamesMap = {
    "Bin Ghatti ⭐": " بن غاطي⭐ ",
    "Ellington Properties": "إلينغتون العقارية",
    "Sobha Realty ⭐": " شوبا⭐ ",
    "AZIZI": " عزيزي",
    "DANUBE Properties": "دانوب العقارية",
    "Meraas ⭐": "  ميراس⭐ ",
    "LEOS": "ليوس",
    "Reportage Prime Properties": "ريبورتاج برايم العقارية",
    "EBDAA": "إبداع"
  };

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('/api/user?role=developer');
        const data = await response.json();

        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);



  const handleChange = (e) => {
    if (e.target.id === 'preferredDeveloper') {
      const selectedDeveloper = developers.find(
        (developer) => developer.username === e.target.value
      );

      setFormData({
        ...formData,
        associatedDeveloper: selectedDeveloper ? selectedDeveloper._id : '',
        [e.target.id]: e.target.value,
        role: 'microdeveloper',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        role: 'microdeveloper',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/microdevelopersignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      navigate('/sign-in');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('https://sarthakhousing.com/wp-content/uploads/2024/01/Sarthak-Real-Estate-Blog.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <section className="relative z-10 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">

        <div className='lg:w-3/4 max-w-xl bg-white p-12 rounded-xl'>
          <div className='text-center md:text-left'>

            <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
              <p className='mx-4 mb-0 text-center text-black font-bold text-2xl'>{t("sign_up")}</p>
            </div>
            {/* Username input */}
            <input
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              className='text-md w-full px-4 py-2 border border-solid border-gray-300 rounded'
              type='text'
              placeholder={t("username")}
              id='username' // Match the id to your form data
              onChange={handleChange} // Handle input change
            />
            {/* Email input */}
            <input
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              className='text-md w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
              type='text'
              placeholder={t("e-mail")}
              id='email' // Match the id to your form data
              onChange={handleChange} // Handle input change
            />
            {/* Password input */}
            <input
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              className='text-md w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
              type='password'
              placeholder={t("pass")}
              id='password' // Match the id to your form data
              onChange={handleChange} // Handle input change
            />
            {/* Developer selection */}
            <select
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              id='preferredDeveloper'
              className='text-md w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
              onChange={handleChange}
            >
              <option
                value=''>{t("select_dev")}</option>
              {developers.map((developer) => (
                <option key={developer._id} value={developer.username}>
                  {isArabic ? arabicNamesMap[developer.username.trim()] || developer.username : developer.username}
                </option>
              ))}

            </select>
            {/* Sign up button */}
            <div className='text-center md:text-center'>
              <button
                className=' mt-4 bg-black hover:bg-yellow-700 font-bold px-4 py-2 text-white uppercase rounded text-md tracking-wider'
                type='submit'
                onClick={handleSubmit} // Handle form submission
              >
                {t("sign_up")}
              </button>
            </div>
            {/* Error message display */}
            {error && (
              <p className='text-red-500 mt-5 text-center'>
                {i18n.language === 'ar' ? ' حدث خطأ في التنفيذ! يرجى المحاولة مرة أخرى' : error}
              </p>
            )}
            {/* Already have an account link */}
            <div className='mt-4 font-semibold text-sm text-slate-500 text-center' dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
              {t("have_account")}{' '}
              <Link className='text-yellow-600 hover:underline hover:underline-offset-4' to='/sign-in'>
                {t("sign_in")}
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default MicroDeveloperSignUp;
