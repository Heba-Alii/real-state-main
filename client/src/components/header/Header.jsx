import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../pages/color.css";
import "../../i18n";
import ArOffersButton from "./AROfferButton";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang.toUpperCase());
    setShowLangMenu(false);
    i18n.changeLanguage(lang.toLowerCase());
  };

  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo and Offer Button */}
        <div className="flex items-center space-x-4" dir={isArabic ? 'rtl' : 'ltr'}>
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl text-white flex items-center">
              <span
                className={`ARcolors-1000 ${isArabic ? 'ml-4' : 'mr-4'
                  }`}
              >
                {t("AR_REALSTATE")}
              </span>
            </h1>
          </Link>
          <ArOffersButton />
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg flex items-center"
        >
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`text-black outline-none mr-4 bg-transparent w-full text-lg ${language === "AR" ? "text-right placeholder:text-right" : "text-left"
              }`}
            placeholder={t("Search_listings")}
          />
          <button type="submit">
            <FaSearch className="text-black" />
          </button>
        </form>
        {/* Navigation Links */}
        <ul
          className={`flex items-center ${language === "AR"
            ? "flex-row-reverse space-x-reverse space-x-8"
            : "flex-row space-x-8"
            }`}
        >

          <li className="hidden sm:inline text-white font-bold hover:text-yellow-400 text-lg">
            <Link to="/">{t("home")}</Link>
          </li>

          <li className="hidden sm:inline text-white font-bold hover:text-yellow-400 text-lg">
            <Link to="/about">{t("about")}</Link>
          </li>


          {/* Language Switcher */}
          <div className="relative hidden sm:inline-block">
            <button
              onClick={() => setShowLangMenu((prev) => !prev)}
              className="text-white font-bold hover:text-yellow-400 transition duration-200"
            >
              <i className="fa fa-globe mr-1" /> {language}
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden min-w-[120px] border border-gray-200">
                <ul className="text-sm">
                  <li
                    className="px-4 py-2 hover:bg-yellow-100 font-bold cursor-pointer transition duration-150"
                    onClick={() => handleLanguageChange("en")}
                  >
                    🇬🇧 English
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer font-bold transition duration-150"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    🇸🇦 العربية
                  </li>
                </ul>
              </div>
            )}
          </div>

          {!currentUser && (
            <li className="hidden sm:inline text-white font-bold hover:text-yellow-400 text-lg">
              <Link to="/sign-in">{t("sign_in")}</Link>
            </li>
          )}


          {isAdmin && (
            <>
              <li className="hidden sm:inline text-white font-bold hover:text-yellow-400">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="hidden sm:inline text-white font-bold hover:text-yellow-400">
                <Link to="/test">Test</Link>
              </li>
            </>
          )}


          {/* Profile / Avatar */}
          {currentUser ? (
            <li>
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </header>
  );
}
