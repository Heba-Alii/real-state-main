import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingForDeveloper from './ListingDeveloper';
import { useTranslation } from "react-i18next";


export default function DeveloperProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [user, setUser] = useState(null);
  const arabicNamesMap = {
    "Bin Ghatti ⭐": " بن غاطي⭐ ",
    "Ellington Properties": "إلينغتون العقارية",
    "Sobha Realty ⭐": " شوبا⭐ ",
    "AZIZI": " عزيزي",
    "DANUBE Properties": "دانوب العقارية",
    "Meraas ⭐": "  ميراس⭐ ",
    "LEOS": "ليوس",
    "Reportage Prime Properties": "ريبورتاج برايم العقارية",
    "EBDAA": "إبداع",
    "Alaa Rebhi Admin": "المدير/ علاء ربحي"
  };
  const getTranslatedOwner = (name) => {
    const trimmed = name?.trim();
    return i18n.language === 'ar' && arabicNamesMap[trimmed]
      ? arabicNamesMap[trimmed]
      : trimmed;
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/edit-user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors or set an error state
      }
    };

    fetchUser();
  }, [id]);

  return (
    <main>
      {/* Existing code for profile */}
      {user ? (
        <div className=" mx-auto"  >


          {/* Top section with responsive height */}
          <div className="sm:h-22 bg-white h-20"></div>
          <div className="bg-white shadow-md -mt-20 p-4 text-center rounded-t-3xl">
            <div className="flex flex-col items-center text-yellow-900 ">
              <div className="w-12 sm:w-10/12 md:w-4/6 lg:w-32 overflow-hidden rounded-full">
                {/* Adjust the width based on screen size */}
                <img src={user.avatar} alt="User Avatar" className="object-cover w-full h-full" />
              </div>
              <h1 className="text-3xl font-bold mt-2">
                {getTranslatedOwner(user.username)}
              </h1>
            </div>

          </div>



          <div className=" py-7 px-3 bg-black">

            {/* Wrap each ListingForDeveloper component within a grid item */}
            <div className="sm:w-full gap-4">
              <ListingForDeveloper id={id} />
            </div>
          </div>



        </div>


      ) : (

        <main className="flex justify-center items-start min-h-screen py-7">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </main>

        // <p>Loading...</p>
      )}
    </main>
  );
}


{/*           
          <div className='w-full flex max-w-fit ' >
          <ListingForDeveloper id={id} />
        </div>
        </div> */}