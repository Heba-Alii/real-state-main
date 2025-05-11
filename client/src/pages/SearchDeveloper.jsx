import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/userSlice.js";
import UserItem from "./UserItem.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

const SearchDeveloper = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users: userList } = useSelector(({ user }) => user);
  const usersPerPage = 10;

  const filteredUsers = userList?.filter(
    ({ username, email, role }) =>
      (username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      role.toLowerCase() === "developer"
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = isSearching
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : userList?.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleViewAll = () => {
    setIsSearching(false);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUsers(searchQuery));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>

      <div className="flex flex-col md:flex-row min-h-screen">

        {/* Sidebar */}
        <div className="md:w-1/4 w-full bg-black text-white p-6">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mt-20">
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/search"
                className={`text-gray-600 hover:text-blue-400 ${location.pathname === "/search" ? "text-blue-500" : ""}`}
              >
                <div className="flex items-center space-x-2 text-white hover:text-yellow-400">
                  <FaHome size={24} />
                  <span className="font-semibold sm:flex md:hidden lg:hidden xl:flex">properties</span>
                </div>
              </Link>

              <div className="flex items-center gap-2 font-semibold rounded bg-ARcolors-3000 p-2 text-white ml-2">
                <FaUser size={24} />
                <span className="font-semibold sm:flex md:hidden lg:hidden xl:flex ">Developer</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-bold">
              <input
                type="text"
                id="searchTerm"
                placeholder="Search Term..."
                className="border rounded-lg p-3 w-full text-black"
                value={searchQuery}
                onChange={handleChange}
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-ARcolors-3000 text-white p-3 rounded-lg uppercase hover:opacity-85 flex-1 font-bold"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleViewAll}
                  className="bg-ARcolors-3000 text-white p-3 rounded-lg uppercase hover:opacity-85 flex-1 font-bold"
                >
                  View All
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 w-full bg-gray-900 p-1 ">
          <div className="user-list gap-4 flex-wrap my-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 justify-center">
            {currentUsers?.map((user) => (
              <UserItem key={user._id} user={user} className="bg-white m-3" />
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default SearchDeveloper;
