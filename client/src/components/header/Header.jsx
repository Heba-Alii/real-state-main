import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../pages/color.css";
import ArOffersButton from "./AROfferButton";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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
    }
    setSearchTerm("");
  }, [location.search]);

  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex justify-between items-center mx-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="ARcolors-1000">AR Real</span>
              <span className="ARcolors-1000"> Estate</span>
            </h1>
          </Link>
          <div className="flex justify-between items-center mx-3">
            <ArOffersButton />
          </div>
        </div>

         <Link to="/search">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-3 rounded-lg flex items-center"
          > 
            
            <label
        htmlFor="searchInput"
        className="bg-transparent focus:outline-none w-14 sm:w-60 text-black font-bold hidden sm:inline-block text-center"
      >
        Show Listings...
      </label>
            <FaSearch className="text-black" />
          </form> 
    </Link> 
        <ul className="flex gap-12">
          <Link to="/">
            <li className="hidden sm:inline text-white font-bold hover:underline items-center">
              Home
            </li>
          </Link>


          {isAdmin ? (
            <Link to="/Admin">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Admin
              </li>
            </Link>
          ) : null}

          {isAdmin ? (
            <Link to="/test">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Test
              </li>
            </Link>
          ) : null}

          <Link to="/about">
            <li className="hidden sm:inline text-white font-bold hover:underline">
              About
            </li>
          </Link>
  <Link to="/">
            <li className="hidden sm:inline text-white font-bold hover:underline">
            <i className="fa fa-globe"></i> EN | AR
            </li>
          </Link>


          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-white font-bold hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
