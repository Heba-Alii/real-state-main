import React, { useState } from 'react';
import { useTranslation } from "react-i18next";


const ListingDescription = ({ description }) => {
  const [showMore, setShowMore] = useState(false);

  // Function to toggle show/hide of extra lines
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Splitting the description by lines
  const descriptionLines = description.split('\n');

  // Display only the first two lines or all lines based on the state
  const displayDescription = showMore ? description : descriptionLines.slice(0, 2).join('\n');
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  return (
    <div
    >
      <p className='text-slate-800'>
        <span dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className='font-bold text-black underline block mt-2'>{t("desc")} : </span>
        {displayDescription}
      </p>
      {/* Show toggle button if there are more than 2 lines */}
      {descriptionLines.length > 2 && (
        <button dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          onClick={toggleShowMore} className='text-yellow-700 cursor-pointer'>
          {showMore ? t('showLess') : t('showMore')}
        </button>
      )}
    </div>
  );
};

export default ListingDescription;
