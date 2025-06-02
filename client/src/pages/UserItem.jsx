import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const UserItem = ({ user }) => {
  const arabicNamesMap = {
    "bin ghatti ⭐": " بن غاطي⭐ ",
    "ellington properties": "إلينغتون العقارية",
    "sobha realty ⭐": " شوبا⭐ ",
    "azizi": " عزيزي",
    "danube properties": "دانوب العقارية",
    "meraas ⭐": "  ميراس⭐ ",
    "leos": "ليوس",
    "reportage prime properties": "ريبورتاج برايم العقارية",
    "ebdaa": "إبداع",
    "alaa rebhi admin": "المدير/ علاء ربحي"
  };
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  function translateUsername(username, language) {
    if (!username) return "";
    const key = username.toLowerCase().trim();
    if (language === "ar" && arabicNamesMap[key]) {
      return arabicNamesMap[key];
    }
    return username.trim();
  }

  return (
    <div className="user-item col-span-1">
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
        <Link to={`/developer?id=${user._id}`} className="block w-full h-full">
          <div className="h-[320px] w-auto sm:h-[220px]">
            <img
              src={user.avatar}
              alt="user cover"
              className="w-full object-cover hover:scale-105 transition-scale duration-300"
            />
          </div>
          <div className="bg-white">
            <div className="p-3 bg-white flex flex-col gap-2 w-full relative">
              <p className="truncate text-lg font-semibold text-slate-700">
                {/* {user.username} */}
                {translateUsername(user.username, i18n.language)}


              </p>
              <div className="flex  items-center gap-1">
                <p className="text-sm text-gray-600 truncate w-full">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
