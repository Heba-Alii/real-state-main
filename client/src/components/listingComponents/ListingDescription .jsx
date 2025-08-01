import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import translate from 'translate';

const ListingDescription = ({ description }) => {
  const [showMore, setShowMore] = useState(false);
  const [translatedDescription, setTranslatedDescription] = useState('');
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = i18n.language === 'ar' ? 'text-right' : 'text-left';

  useEffect(() => {
    const autoTranslate = async () => {
      if (isArabic) {
        try {
          const translated = await translate(description, { from: "en", to: "ar" });
          setTranslatedDescription(translated);
        } catch (error) {
          console.error("Translation error:", error);
          setTranslatedDescription(description); // fallback
        }
      } else {
        setTranslatedDescription(description);
      }
    };

    autoTranslate();
  }, [description, isArabic]);

  const toggleShowMore = () => setShowMore(!showMore);

  const descriptionLines = translatedDescription.split('\n');
  const displayDescription = showMore ? translatedDescription : descriptionLines.slice(0, 2).join('\n');

  return (
  <div>
    <p 
      className={`text-slate-800 whitespace-pre-line ${textAlign}`} 
      dir={direction}
    >
      <span className='font-bold text-black underline block mt-2'>
        {t("desc")} :
      </span>
      {displayDescription}
    </p>
    {descriptionLines.length > 2 && (
      <button
        dir={direction}
        onClick={toggleShowMore}
        className='text-yellow-700 cursor-pointer'
      >
        {showMore ? t('showLess') : t('showMore')}
      </button>
    )}
  </div>
);
};

export default ListingDescription;
