import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import POPUP from '../POPUP';
import { useTranslation } from "react-i18next";
import "../../i18n";


export default function HomeButtons() {
  const { currentUser } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <div className="flex md:flex-row  flex-col items-center justify-center m-6 ">
          <button
            onClick={toggleDropdown}
            className="
      mt-6 text-2xl font-bold bg-ARcolors-1000 ARcolors-3000
      py-3 px-10  rounded-md shadow-md 
      transition duration-300 w-full md:w-1/4 
      hover:shadow-lg transform sm:mx-1 md:mx-2 hover:scale-105
      flex items-center justify-center hover:bg-black hover:text-white"
          >
            <span>{t("show_developers")}</span>
          </button>


          {currentUser && (
            <Link
              className="
        mt-6 text-2xl font-bold bg-ARcolors-200 text-amber-900
          py-3 px-11 md:px-16 rounded-md shadow-md 
          transition duration-300 w-full md:w-1/4 sm:w-full
          hover:shadow-lg transform sm:mx-1 md:mx-2 hover:scale-105
          flex items-center justify-center hover:bg-amber-950 hover:text-white"
              to="/create-listing"
            >
              Create Listing
            </Link>
          )}



        </div>
      </div>
      <div className='text-black'>
        <POPUP isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </div>

    </>
  )
}
