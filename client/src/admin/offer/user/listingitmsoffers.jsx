import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";


export default function ListingItem({ listing, id }) {
  const userId = id;

  const [developer, setDeveloper] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offers, setOffers] = useState([]);
  const [newPrice, setNewPrice] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const formatNumber = (num) => (i18n.language === 'ar' ? toArabicNumber(num) : num);
  const addressTranslations = {
    "dubailand": "دبي لاند",
    "Dubai": "دبي",
    "Wadi Al Safa": "وادي الصفا",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    "Abu Dhabi": "أبوظبي",
    "jumeirah village circle": "قرية جميرا الدائرية"

  };
  const nameTranslations = {

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
    "br": "غرفة نوم",

  };


  function toArabicNumber(str) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.toString().replace(/\d/g, d => arabicDigits[d]);
  }

  function translateAddress(address, language) {
    if (!address || language !== 'ar') return address?.trim();

    let translated = address.trim(); // Trim before processing

    for (const key in addressTranslations) {
      const pattern = new RegExp(key, 'gi');
      translated = translated.replace(pattern, addressTranslations[key]);
    }

    return translated.trim(); // Trim after translation (optional)
  }
  function translateListingName(name, language) {
    if (!name || language !== 'ar') return name;

    let translated = name.trim().toLowerCase();

    for (const key in nameTranslations) {
      const pattern = new RegExp(key, 'gi');
      translated = translated.replace(pattern, nameTranslations[key]);
    }

    return toArabicNumber(translated);
  }

  useEffect(() => {
    const fetchDataForOffers = async () => {
      const offerIds = listing.offers;

      try {
        const promises = offerIds.map(async (offerId) => {
          const response = await fetch(`/api/offer/offers/${offerId}`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch offer data: ${response.status} - ${response.statusText}`
            );
          }

          const offerData = await response.json();
          return offerData;
        });

        const offersData = await Promise.all(promises);

        setOffers(offersData);
        setLoading(false);
        setNewPrice(
          listing.priceMin *
          ((100 - (offersData[0]?.discountPercentage || 0)) / 100)
        );
      } catch (error) {
        console.error("Error fetching offer data:", error);
        setError("Failed to fetch offer data. Please try again.");
        setLoading(false);
      }
    };

    fetchDataForOffers();
  }, []);

  return (
    listing.type !== "rent" && (
      <Link
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        to={`/listing/${listing._id}`}
        className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:max-w-[330px]"
      >
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[200px] sm:h-[220px] md:h-[260px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div
          className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {translateListingName(listing.name, i18n.language)}

          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-yellow-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {translateAddress(listing.address, i18n.language)}
            </p>
          </div>
          {/* <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p> */}
          <div className="text-slate-700 flex gap-4 text-xs">
            <div className="font-bold">

              {listing.bedrooms > 1
                ? `${formatNumber(listing.bedrooms)} ${t("beds")}`
                : `${formatNumber(listing.bedrooms)} ${t("bed")}`}
            </div>
            <div className="font-bold">

              {listing.bathrooms > 1
                ? `${formatNumber(listing.bathrooms)} ${t("baths")}`
                : `${formatNumber(listing.bathrooms)} ${t("bath")}`}
            </div>
          </div>
        </div>
        <div className="p-3 ">
          <div className="flex gap-2">
            <h3 className="flex text-lg font-semibold text-slate-700">
              {t("offer_code")}
            </h3>
            {offers.length > 0 && (
              <div className="text-slate-700 font-semibold text-xl items-end">
                {offers[0].code}
              </div>
            )}
          </div>

          {/* <div className="flex items-center gap-2">

            <p className="text-slate-500 mt-2 font-semibold">
              <span style={{ textDecoration: "line-through" }}>
                {listing.priceMin} AED
              </span>
              &nbsp;/&nbsp;
            </p>
            <p className="text-slate-800 mt-2 font-semibold text-xl items-end">
              New Price : {newPrice} AED 
              New Price: {newPrice ? newPrice.toFixed(2) : ""} AED{" "}
            </p>
          </div>  */}
        </div>
      </Link>

    )

  );

}
