import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiUserFill } from 'react-icons/ri';
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };


  const [showSignUpPopup, setShowSignUpPopup] = useState(false);


  const openSignUpPopup = () => {
    setShowSignUpPopup(true);
  };

  const closeSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const handleSignUpUser = () => {
    // Handle signup as user click
    // Redirect to the user signup page
    navigate('/sign-up');
  };

  const handleSignUpDeveloper = () => {
    // Handle signup as developer click
    // Redirect to the developer signup page
    navigate('/dev/sign-up');
  };

  const handleSignUpMicroDeveloper = () => {
    // Handle signup as microdeveloper click
    // Redirect to the microdeveloper signup page
    navigate('/microDev/sign-up');
  };

  return (
    // <div className='p-3 max-w-lg mx-auto'>
    <div className="min-h-screen flex items-center justify-center bg-ARcolors-2000 p-4">
      <div dir="ltr" className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-xl">
        {/* <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1> */}
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="text-center mb-6">
          <img src='https://res.cloudinary.com/dusfhr8a4/image/upload/f_auto,q_auto/um3c2nygafj21nxg381s'
            alt='A.R Estate Logo'
            className="mx-auto h-16" />
          <h2 className={`font-semibold mt-2 ARcolors-5000 mb-10 ${isArabic ? 'text-3xl' : 'text-2xl'}`}>{t("AR_REALSTATE")}</h2>
        </div>


        <h3 className="text-2xl font-bold text-center mb-6 ">{t("sign_in")}</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='email'
            placeholder={t("e-mail")}
            className='border p-3 rounded-lg bg'
            id='email'
            onChange={handleChange}
          />
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='password'
            placeholder={t("pass")}
            className='border p-3 rounded-lg'
            id='password'
            onChange={handleChange}
          />
          {/* <button
            disabled={loading}
            // className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '
            className='w-full bg-ARcolors-2000 hover:bg-yellow-900 text-white py-3 rounded-lg font-semibold'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button> */}
          <button
            disabled={loading}
            className='w-full bg-ARcolors-2000 hover:bg-yellow-900 text-white py-3 rounded-lg font-semibold'
          >
            {loading
              ? (isArabic ? '... جاري التحميل' : 'Loading...')
              : (isArabic ? 'تسجيل الدخول' : 'Sign In')}
          </button>
          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500">{t("or")}</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <OAuth />


        </form>
        <div
          // className='flex gap-2 mt-5'>
          className="text-center mt-4 text-sm text-gray-700 ">
          <p>{t("account")} {"   "}
            <span
              className="text-yellow-600 font-bold hover:underline"
              onClick={openSignUpPopup}>
              {t("sign_up")}
            </span>
          </p>
        </div>
        {error && (
          <p className='text-red-500 mt-5 text-center'>
            {i18n.language === 'ar' ? ' المستخدم غير موجود! يرجى المحاولة مرة أخرى' : error}
          </p>
        )}

        {/* Signup popup */}
        {
          showSignUpPopup && (
            <div className='fixed inset-0 flex items-center justify-center z-50 '>
              <div className='bg-ARcolors-2000 px-8 pb-8 pt-6 rounded-lg shadow-lg relative'>
                <button className='absolute top-4 right-4 text-gray-600 text-4xl' onClick={closeSignUpPopup}>
                  &times;
                </button>
                <h1 className='text-3xl text-center font-semibold px-4 mb-9 ARcolors-7000 underline'>{t("sign_up")}</h1>

                <div className='flex flex-col px-2 pb-2 gap-4 justify-center '>

                  <div className='signup-option flex items-center mx-6 border-2 border-bg-black rounded p-4 bg-white' onClick={handleSignUpUser}>
                    <RiUserFill className='box-icon text-4xl mr-2 text-yellow-500' />
                    <p className='items-center ARcolors-1000 text-black font-bold text-xl'> {t("user")}</p>
                  </div>
                  <div className='signup-option flex items-center mx-6 border-2 border-bg-black rounded p-4 bg-white' onClick={handleSignUpDeveloper}>
                    <FaHome className='box-icon text-4xl mr-2 text-yellow-500' />
                    <p className='items-center ARcolors-1000 text-black font-bold text-xl'> {t("developer")}</p>
                  </div>
                  <div className='signup-option flex items-center mx-6 border-2 border-bg-black rounded p-4 bg-white' onClick={handleSignUpMicroDeveloper}>
                    <IoIosPeople className='box-icon text-4xl mr-2 text-yellow-500' />
                    <p className='items-center ARcolors-1000 text-black font-bold text-xl'> {t("micro")}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </div>
  );
}



