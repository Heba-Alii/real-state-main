import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingForDeveloper from './ListingFordevOffer';
import { useTranslation } from "react-i18next";

// import ListingsWithOffers from './ListingsWithOffers'; // Import your component for displaying listings

export default function DeveloperOfferProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [developer, setDeveloper] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const developerNameTranslations = {
    "Bin Ghatti ⭐": "⭐ بن غاطي",
    "Sobha": "شوبا",
    "Azizi": "عزيزي",
    "Reportage Prime Properties": "ريبورتاج برايم العقارية"
  };
  function translateDeveloperName(name, language) {
    if (!name) return "";
    if (language !== 'ar') return name;

    const trimmedName = name.trim();
    return developerNameTranslations[trimmedName] || trimmedName;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Don't make the API call if id is undefined
        if (!id) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/all/listings-with-non-empty-offers/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setDeveloper(data.developer);
        setListings(data.listings);
        setLoading(false);
        // console.log(data);
        // console.log(data.developer);
        // console.log(data.listings);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);












  return (
    <div>
      {loading &&
        <main className="flex justify-center items-start min-h-screen py-7">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </main>



        // <p>Loading...</p>

      }
      {error && <p>{error}</p>}
      {developer && (
        <div>
          <div className="sm:h-30 bg-white h-32"></div>
          <div className="bg-black shadow-md -mt-20 p-4 text-center ">

            <div className="flex flex-col items-center text-white">
              <div className="w-24 h-24 overflow-hidden rounded-full">
                <img src={developer.avatar} alt="User Avatar" className="object-cover w-full h-full" />
              </div>
              {translateDeveloperName(developer.username, i18n.language)}


            </div>
          </div>

          <div className=" py-7 px-3 bg-black">
            <div className="sm:w-full gap-4">

              <ListingForDeveloper userId={id} developer={developer} listings={listings} />
            </div>
          </div>
        </div>

      )}
    </div>
  );
}
