import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/OAuth';
import { useTranslation } from "react-i18next";


export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      role: 'user',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div class="min-h-screen bg-ARcolors-2000 p-10">
      <div className='p-10 max-w-lg mx-auto bg-white rounded-xl'>
        <h1 className='text-3xl text-center font-bold my-7'>{t("sign_up")}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='text'
            placeholder={t("username")}
            className='border p-3 rounded-lg'
            id='username'
            onChange={handleChange}
          />
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='email'
            placeholder={t("e-mail")}
            className='border p-3 rounded-lg'
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
          <button
            disabled={loading}
            className='w-full bg-ARcolors-2000 hover:bg-yellow-900 text-white py-3 rounded-lg font-semibold'
          >
            {loading
              ? (isArabic ? '... جاري التحميل' : 'Loading...')
              : (isArabic ? 'تسجيل الدخول' : 'Sign In')}
          </button>

          {/* <button
            disabled={loading}
            className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button> */}
          <OAuth />
        </form>
        <div
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className='flex gap-2 mt-5'>
          <p>{t("account")}</p>
          <Link to={'/sign-in'}>
            <span className='text-yellow-600 font-bold underline'>{t("sign_up")}</span>
          </Link>
        </div>
        {error && (
          <p className='text-red-500 mt-5 text-center'>
            {i18n.language === 'ar' ? ' حدث خطأ في التنفيذ! يرجى المحاولة مرة أخرى' : error}
          </p>
        )}
        {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
      </div>
    </div>
  );

}
