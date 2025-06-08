import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";


export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  function translateName(name, language) {
    if (!name) return "";

    if (language !== 'ar') return name;

    // Convert numbers to Arabic digits
    let translated = name.replace(/\d/g, d => toArabicNumber(d));

    // Word-based translation
    const wordMap = {
      "\\bstudio\\b": "ستوديو",
      "\\bbedroom\\b": "غرفة نوم",
      "\\bbed\\b": "غرفة نوم",
      "\\bbr\\b": "غرفة نوم",
      "\\bvilla\\b": "فيلا",
      "\\btownhouse\\b": "تاون هاوس",
      "office": "مكتب",
      "pool": "حمام سباحة"
    };
    function toArabicNumber(number) {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return number.toString().replace(/\d/g, d => arabicDigits[d]);
    }

    for (const key in wordMap) {
      const pattern = new RegExp(key, "gi");
      translated = translated.replace(pattern, wordMap[key]);
    }

    return translated;
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='inline'>
          <div className='flex flex-col gap-2'>
            <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
              {t("contact")} <span className='font-semibold'>{landlord.username}</span>{' '}
              {t("for")}{' '}
              {/* <span className='font-semibold'>{listing.name.toLowerCase()}</span> */}
              <span className='font-semibold'>
                {translateName(listing.name.toLowerCase(), i18n.language)}
              </span>

            </p>
            <textarea
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              name='message'
              id='message'
              rows='2'
              value={message}
              onChange={onChange}
              placeholder={t("e-mail_message")}
              className='w-full border p-3 rounded-lg'
            ></textarea>

            <Link
              // to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              to={`mailto:arrealstate79@gmail.com?subject=Regarding ${listing.name}&body=${message}`}
              className='bg-yellow-700 text-white text-center p-3 uppercase rounded-3xl font-bold hover:opacity-95'
            >
              {t("send_message")}
            </Link>
          </div>
        </div>

      )}
    </>
  );
}
