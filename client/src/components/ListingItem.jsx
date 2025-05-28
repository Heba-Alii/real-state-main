import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from "react-icons/fa";
import { useTranslation } from "react-i18next";



export default function ListingItem({ listing }) {
  const { i18n } = useTranslation();


  const nameTranslations = {
    "studio": "ستوديو",
    "bedrooms": "غرف نوم",
    "bedroom": "غرفة نوم",
    "br": "غرفة نوم",
    "bed": "غرفة نوم",
    "pool": "حمام سباحة"

  };

  function translateName(name, language) {
    if (!name) return "";

    // If English, return as is
    if (language !== 'ar') return name;

    // Convert all digits to Arabic
    let translated = name.replace(/\d/g, d => toArabicNumber(d));

    // Replace known English words with Arabic
    for (const key in nameTranslations) {
      const pattern = new RegExp(key, "gi"); // case-insensitive
      translated = translated.replace(pattern, nameTranslations[key]);
    }

    return translated;
  }

  function toArabicNumber(number) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().replace(/\d/g, d => arabicDigits[d]);
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:max-w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
          alt='listing cover'
          className='h-[200px] sm:h-[220px] md:h-[260px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div
          className='p-3 flex flex-col gap-3 w-full'>
          <p className='truncate text-lg font-bold text-black'>
            {translateName(listing.name, i18n.language)}


          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-yellow-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>



          <div className='text-yellow-700 flex gap-2 text-sm mt-5'>
            {listing.bedrooms !== 0 && (
              <div className="font-bold flex items-center gap-2">
                <FaBed size={20} />

                {listing.bedrooms > 1
                  ? `${listing.bedrooms} `
                  : `${listing.bedrooms} `}
              </div>
            )}
            {listing.bathrooms !== 0 && (
              <div className="font-bold flex items-center gap-2">
                <FaBath size={15} />

                {listing.bathrooms > 1
                  ? `${listing.bathrooms} `
                  : `${listing.bathrooms} `}
              </div>
            )}
            {listing.priceMin !== 0 ? (
              <div className="w-full flex justify-end">
                <p className='text-yellow-700 font-bold text-md'>
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-US')
                    : listing.priceMin.toLocaleString('en-US')} {' '}
                  AED
                </p>
              </div>

            ) : (
              <p className='text-slate-500 mt-2 font-semibold '>Available On Request</p>
            )}

          </div>
        </div>

      </Link>
    </div>
  );
}
