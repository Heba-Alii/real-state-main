import React, { useState, useEffect } from 'react';
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../../components/Contact";
import ListingDescription from "../listingComponents/ListingDescription ";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import translate from 'translate';


function toArabicNumber(number) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().replace(/\d/g, digit => arabicDigits[digit]);
}
const formatNumber = (num) => {
  return i18n.language === 'ar' ? toArabicNumber(num) : num;
};
const result = await translate("Investment Type", { to: 'ar' });

const TexteArea = ({
  listing,
  contact,
  setContact,
  sendWhatsappMessage,
  offerData,
}) => {
  const [translatedInvestmentDetails, setTranslatedInvestmentDetails] = useState('');

  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  //invesment
  useEffect(() => {
    const autoTranslateInvestmentDetails = async () => {
      if (isArabic && listing?.InvestmentTypeDetails) {
        try {
          const translated = await translate(listing.InvestmentTypeDetails, {
            from: 'en',
            to: 'ar'
          });
          setTranslatedInvestmentDetails(translated);
        } catch (error) {
          console.error("Translation error for InvestmentTypeDetails:", error);
          setTranslatedInvestmentDetails(listing.InvestmentTypeDetails); // fallback
        }
      } else {
        setTranslatedInvestmentDetails(listing?.InvestmentTypeDetails || '');
      }
    };

    autoTranslateInvestmentDetails();
  }, [i18n.language, listing?.InvestmentTypeDetails, isArabic]);

  /////////////////////////////////////////////////////////////////////
  const linkTo =
    listing.projectName === "Binghatti Phantom"
      ? "/PaymentPlanBINGHATTIPHANTOM"
      : "/PaymentPlan";

  const showMinMax = listing.showMinMax;

  const constructWhatsAppMessage = () => {
    const {
      name,
      type,
      description,
      address,
      InvestmentTypeDetails,
      PriceMin,
      bedrooms,
      bathrooms,
      parking,
      furnished,
    } = listing;

    const formattedType = type === "rent" ? "For Rent" : "For Buy";


    const message =
      `Hi, I'm interested in the property: ${name} - ${formattedType}.\n` +
      `Description: ${description}\n`;

    return encodeURIComponent(message);
  };

  const handleSendWhatsAppMessage = () => {
    setIsSendingMessage(true);

    const formattedMessage = constructWhatsAppMessage();

    const phoneNumber = "971588247858";

    const whatsappLink = `https://api.whatsapp.com/send/?phone=971562929527&text=${formattedMessage}&type=phone_number&app_absent=0`;

    window.open(whatsappLink, "_blank");
    console.log(whatsappLink);

    setIsSendingMessage(false);
  };
  const typeKey = listing.realEstateType?.trim().toLowerCase();

  const realEstateTyping = {
    "apartment/flat": "شقة",
    "villa/townhouse": "فيلا",
    "land/plot": "أرض / قطعة أرض",
    "office/ officespace": "مكتب",
    "retail space/shop/store": "مساحة تجارية / متجر / محل",
    "warehouse/storage space": "مستودع / مساحة تخزين",
    "commercial building /commercial property": "مبنى تجاري / عقار تجاري"

  };
  const addressTranslations = {
    "Business Bay": "الخليج التجاري",
    "Downtown Dubai": "وسط مدينة دبي",
    "Dubai Marina": "مرسى دبي",
    "Jumeirah": "جميرا",
    "Palm Jumeirah": "نخلة جميرا",
    "Dubai": "دبي",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    "Sheikh Zayed Road": "شارع الشيخ زايد",
    "Jebel Ali": "جبل علي",
    "Siniya Island": "جزيرة صينية",
    "City of Arabia": "مدينة العرب",
    "UAE": "الإمارات العربية المتحدة",
    "Emirates City": "مدينة الإمارات",
    "Shk. Mohammad Bin Zayed Road": "شارع الشيخ محمد بن زايد",
    "in": "في",
    "TYPE": "النوع",
    "Wadi Al Safa Dubailand": "وادي الصفا دبي لاند",
    "Village": "قرية",
    "Jumeirah Village": "قرية جميرا",
    "Circle": "دائرة",
    "Studio": "استوديو",
    "BedRoom": "غرفة نوم",
    "bedrooms": " غرف نوم",
    "Street": "شارع",
    "Sheikh Zayed": "الشيخ زايد",
    "Unit": "وحدة"

  };
  const nameTranslations = {
    "studio": "ستوديو",
    "bedrooms": "غرف نوم",
    "bedroom": "غرفة نوم",
    "bed": "غرفة نوم",
    "pool": "حمام سباحة",
    "office": "مكتب",
    "village": "قرية",
    "villa": "فيلا",
    "bedroom": "غرفة نوم",
    "studio": "استوديو",
    "apartment": "شقة",
    "townhouse": "تاون هاوس",
    "sobha": "شوبا",
    "azizi": "عزيزي",
    "binghatti": "بن غاطي",
    "taormina": "تاورمينا",
    "corner": "زاوية",
    "luxury": "فاخرة",
    "retail space": "محل تجاري",
    "\\bbr\\b": "غرفة نوم",
  };
  function translateName(name) {
    if (!name) return "";

    // Replace digits with Arabic numbers
    let replacedNumbers = name.replace(/\d+/g, num => toArabicNumber(num));

    // Lowercase and trim for lookup
    const lowerName = replacedNumbers.toLowerCase().trim();

    // Try full exact match in translation dictionary
    if (nameTranslations[lowerName]) {
      return nameTranslations[lowerName];
    }

    // Replace words from dictionary in string
    for (const [enWord, arWord] of Object.entries(nameTranslations)) {
      const regex = new RegExp(enWord, "gi");
      replacedNumbers = replacedNumbers.replace(regex, arWord);
    }

    return replacedNumbers;
  }


  const investmentTypeTranslations = {
    'payment plan': i18n.language === 'ar' ? 'خطة سداد' : 'Payment Plan',
    'ready': i18n.language === 'ar' ? 'جاهز' : 'Ready',
    'handover': i18n.language === 'ar' ? 'تسليم' : 'Handover',
  };

  const investmentTypeDetailsTranslations = {
    "during construction": "أثناء الإنشاء",
    "on handover": "عند التسليم",
    "ready": "جاهز"
  };
  const translateInvestmentDetails = (text) => {
    if (!text) return "";

    return text
      .split(",") // split by comma
      .map((part) => {
        // find the text part to translate
        const match = Object.keys(investmentTypeDetailsTranslations).find((key) =>
          part.toLowerCase().includes(key)
        );

        if (match) {
          // replace the English part with Arabic
          return part.replace(
            new RegExp(match, "i"),
            investmentTypeDetailsTranslations[match]
          );
        }
        return part;
      })
      .join("،") // Arabic comma
      .replace(/\d+/g, (digit) => toArabicNumber(digit)) // convert numbers to Arabic if needed
      .replace(/%/g, "٪"); // convert % symbol to Arabic
  };

  function translateAddress(address) {
    if (!address) return "";
    let translated = address;
    Object.entries(addressTranslations).forEach(([en, ar]) => {
      translated = translated.replace(en, ar);
    });
    return translated;
  }

  return (
    <main>
      <div className="flex flex-col max-4xl mx-auto p-3 my-7 gap-4 ">
        <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

          className="text-2xl font-bold text-center ">

          {/* {listing.name} */}
          {i18n.language === 'ar' ? translateName(listing.name) : listing.name?.trim()}

        </p>

        {listing && offerData && offerData.length !== 0 && (
          <div>
            <Link to={linkTo}>
              <main dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                className="flex justify-center items-center">
                <p className="bg-black w-full lg:max-w-[400px] sm:max-w-screen-sm text-white text-center p-3 rounded-3xl " >
                  <span className="mr-2">{t("offer_code")}</span>
                  <span className="font-bold mr-4">{offerData.code}</span>
                  <span className="mr-2 underline font-semibold text-yellow-200">{t("see_details")}</span>
                  {/* // <span className="font-bold">{newPrice.toLocaleString('en-US')} AED</span> */}
                </p>
              </main>
            </Link>
          </div>
        )}

        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="flex items-center gap-2 text-slate-600 text-sm">

          <p className="flex items-center mt-2 gap-2 text-yellow-600 text-sm">
            <FaMapMarkerAlt className="text-yellow-600" />
            {i18n.language === 'ar'
              ? translateAddress(listing.address?.trim() || '')
              : (listing.address?.trim() || '')}
          </p>

          <p className="flex items-center mt-2 gap-2 text-yellow-600 text-sm">
            <FaMapMarkerAlt className="text-yellow-600" />
            {listing.projectName?.trim() || ''}
          </p>

          <p className="flex items-center mt-2 gap-2 text-yellow-600 text-sm">
            <FaMapMarkerAlt className="text-yellow-600" />
            {i18n.language === 'ar'
              ? translateAddress(listing.propertyAddressInProject?.trim() || '')
              : (listing.propertyAddressInProject?.trim() || '')}
          </p>

        </div>

        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="flex justify-start gap-4 ">
          <p className="bg-yellow-700 w-full max-w-[200px] text-white text-lg text-center p-1 rounded-lg font-bold"
          >

            {listing.type === "rent"
              ? t("for_rent")
              : listing.type === "sale"
                ? t("for_sale")
                : listing.type === "buy"
                  ? t("for_buy")
                  : t("unknown_type")}
          </p>
        </div>

        <h1 className="text-xl font-bold mt-8 mb-2 text-black text-center">
          {t("property_information")}
        </h1>

        <ListingDescription description={listing.description} />

        {listing && listing.type !== "rent" && (
          <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

            className="flex gap-2 ">
            <p className="text-slate-800">
              <span
                className="font-semibold text-black block mt-2 underline">
                {t("real_state_type")} :{" "}
              </span>
              {i18n.language === 'ar'
                ? realEstateTyping[typeKey] || listing.realEstateType
                : listing.realEstateType}
            </p>
          </div>
        )}
        {/* 
        {listing.priceMin !== 0 && (
          <>
            {listing && showMinMax ? (
              <p className="text-slate-800">
                <span className="font-semibold text-black">Price : </span>
                {`${listing.priceMin.toLocaleString(
                  "en-US"
                )} - ${listing.priceMax.toLocaleString("en-US")} AED`}
              </p>
            ) : (
              <p className="text-slate-800">
                <span className="font-semibold text-black">Price : </span>
                {`${listing.priceMin.toLocaleString("en-US")} AED`}
              </p>
            )}
          </>
        )} */}



        {listing.priceMin !== 0 ? (
          <>
            {listing && showMinMax ? (
              <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

                className="text-slate-800 text-2xl">
                <span className="font-bold text-black block mt-2 underline">{t("price")}</span>
                {/* {`${listing.priceMin.toLocaleString("en-US")} - ${listing.priceMax.toLocaleString("en-US")} AED`}
              </p> */}
                {isArabic
                  ? `${toArabicNumber(listing.priceMin.toLocaleString("en-US"))} - ${toArabicNumber(listing.priceMax.toLocaleString("en-US"))} درهم`
                  : `${listing.priceMin.toLocaleString("en-US")} - ${listing.priceMax.toLocaleString("en-US")} AED`}
              </p>
            ) : (
              <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                className="text-slate-800 text-2xl">
                <span className="font-bold text-black underline">{t("price")}</span>{' '}
                {/* {`${listing.priceMin.toLocaleString("en-US")} AED`} */}
                {isArabic
                  ? `${toArabicNumber(listing.priceMin.toLocaleString("en-US"))} درهم`
                  : `${listing.priceMin.toLocaleString("en-US")} AED`}
              </p>
            )}
          </>
        ) : (
          <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            className="text-slate-800 text-2xl">
            <span className="font-bold text-black underline">
              {t("price")}</span>
            {t("available_on_request")}
          </p>
        )}
        <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="text-slate-800">

          <span
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="font-semibold text-black block mt-2 underline">


            {listing.InvestmentType
              ? investmentTypeTranslations[listing.InvestmentType.toLowerCase()] || listing.InvestmentType
              : t('investmentType')}
            :
          </span>
          {/* {investmentTypeDetailsTranslations[listing.InvestmentTypeDetails?.toLowerCase()] ||
            listing.InvestmentTypeDetails ||
            t('investmentTypeDetails')} */}
          {translatedInvestmentDetails || t('investmentTypeDetails')}

        </p>


        {listing.type === "rent" && (
          <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            className="text-slate-800">
            <span className="font-semibold text-black">{t("rental_type")}{":"} </span>
            {listing.rentalType || "Rental Type"}
          </p>
        )}

        {listing && listing.paymentType === "cash" && (
          <p dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            className="text-slate-800">
            <span className="font-semibold text-black">{t("cashAmount")} : </span>
            {listing.cashAmount} {t("aed")}
          </p>
        )}

        {listing.totalAreaMin !== 0 && (
          <h1 className="text-xl font-bold mt-8 mb-2 text-gray-800 text-center">
            {t("property_area")}
          </h1>
        )}

        {/* <div>  */}

        {

        }



        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          {showMinMax ? (
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

              className='gap-2 '>
              {listing.internalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("internal_area")}{' '}</span>
                  {i18n.language === 'ar' ? toArabicNumber(listing.internalAreaMin) : listing.internalAreaMin}
                  {listing.internalAreaMax !== 0 && (
                    <>
                      <span className='font-semibold text-black'> - </span>
                      {i18n.language === 'ar' ? toArabicNumber(listing.internalAreaMax) : listing.internalAreaMax}
                    </>
                  )}
                  {' '}{t("sqft")}
                </p>
              )}


              {listing.externalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("external_area")}{' '}</span>
                  {i18n.language === 'ar' ? toArabicNumber(listing.externalAreaMin) : listing.externalAreaMin}
                  {listing.externalAreaMax !== 0 && (
                    <>
                      <span className='font-semibold text-black'> - </span>
                      {i18n.language === 'ar' ? toArabicNumber(listing.externalAreaMax) : listing.externalAreaMax}
                    </>
                  )}
                  {' '}{t("sqft")}
                </p>
              )}


              {listing.totalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("total_area")}{' '}</span>
                  {i18n.language === 'ar' ? toArabicNumber(listing.totalAreaMin) : listing.totalAreaMin}
                  {listing.totalAreaMax !== 0 && (
                    <>
                      <span className='font-semibold text-black'> - </span>
                      {i18n.language === 'ar' ? toArabicNumber(listing.totalAreaMax) : listing.totalAreaMax}
                    </>
                  )}
                  {' '}{t("sqft")}
                </p>
              )}

            </div>
          ) : (
            <div className='gap-2 '>
              {/* {listing.internalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("internal_area")}</span>
                  {listing.internalAreaMin}{t("sqft")}
                </p>
              )} */}
              {listing.internalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("internal_area")}{' '}</span>
                  {i18n.language === 'ar'
                    ? toArabicNumber(listing.internalAreaMin)
                    : listing.internalAreaMin}
                  {' '} {t("sqft")}
                </p>
              )}

              {listing.externalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("external_area")}{' '}</span>
                  {i18n.language === 'ar'
                    ? toArabicNumber(listing.externalAreaMin)
                    : listing.externalAreaMin}
                  {' '} {t("sqft")}
                </p>
              )}

              {listing.totalAreaMin !== 0 && (
                <p className='text-slate-800 pb-2'>
                  <span className='font-semibold text-black'>{t("total_area")}{' '}</span>
                  {i18n.language === 'ar'
                    ? toArabicNumber(listing.totalAreaMin)
                    : listing.totalAreaMin}
                  {' '} {t("sqft")}
                </p>
              )}

            </div>
          )}


          {listing.BUA !== 0 && (
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>{t("built-Up_area")}{' '} : </span>
              {i18n.language === 'ar'
                ? toArabicNumber(listing.BUA)
                : listing.BUA}
              {' '}{t("sqft")}
            </p>
          )}

        </div>

      </div>

      {listing &&
        listing.type !== "rent" &&
        (listing.ageYear !== 0 || listing.ageMonth !== 0) && (
          <div className="flex gap-2">
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Real Estate Age :{" "}
              </span>
              {listing.ageYear !== 0 && listing.ageMonth !== 0
                ? `${listing.ageYear} Year ${listing.ageMonth} Month`
                : listing.ageYear !== 0
                  ? `${listing.ageYear} Year`
                  : `${listing.ageMonth} Month`}
            </p>
          </div>
        )}

      <ul dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        className="text-yellow-700 font-semibold text-sm flex flex-wrap items-center ml-2 gap-4 sm:gap-6 ">
        {listing.bedrooms !== 0 && (
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBed className="text-lg" />
            {/* {listing.bedrooms > 1
              ? `${listing.bedrooms} beds `
              : `${listing.bedrooms} bed `} */}
            {isArabic
              ? `${toArabicNumber(listing.bathrooms)} ${listing.bathrooms > 1 ? t("beds") : t("bed")}`
              : `${listing.bathrooms} ${listing.bathrooms > 1 ? t("beds") : t("bed")}`}
          </li>
        )}

        {listing.bathrooms !== 0 && (
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg" />
            {/* {listing.bathrooms > 1
              ? `${listing.bathrooms} baths `
              : `${listing.bathrooms} bath `} */}
            {isArabic
              ? `${toArabicNumber(listing.bathrooms)} ${listing.bathrooms > 1 ? t("baths") : t("bath")}`
              : `${listing.bathrooms} ${listing.bathrooms > 1 ? t("baths") : t("bath")}`}
          </li>
        )}
        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaParking className="text-lg" />
          {listing.parking ? t("Parking_spot") : t("no_park")}
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaChair className="text-lg" />
          {listing.furnished ? t("furnished") : t("unfurnished")}
        </li>
      </ul>


      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        {!contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-black text-white font-bold rounded-3xl uppercase hover:opacity-95 p-3 "
          >
            {t("contact_mail")}
          </button>
        )}
        {contact && <Contact listing={listing} />}
        <button
          onClick={handleSendWhatsAppMessage}
          disabled={isSendingMessage}
          className="w-full bg-black text-white font-bold rounded-3xl uppercase hover:opacity-95 p-3"
        >
          {isSendingMessage ? t("sending") : t("send_whatsapp_message")}
        </button>
      </div>
    </main>
  );
};

export default TexteArea;

