import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSort, FaTypo3, FaUser } from "react-icons/fa";
import { FaSearch, FaTags, FaCar, FaMoneyCheckAlt } from "react-icons/fa";
import { t } from "i18next";



export default function SearchProperties() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    // offer: false,
    sort: "created_at",
    order: "desc",
    InvestmentType: "all",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    // const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const InvestmentTypeFromUrl = urlParams.get("InvestmentType");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      // offerFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      InvestmentTypeFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        // offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
        InvestmentType: InvestmentTypeFromUrl || "all",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale" ||
      e.target.id === "buy"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished"
      // ||
      // e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }

    if (e.target.id === "InvestmentType") {
      setSidebardata({
        ...sidebardata,
        InvestmentType: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    // urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    urlParams.set("InvestmentType", sidebardata.InvestmentType);
    const searchQuery = urlParams.toString();
    // console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  // return (
  //     <div className="flex flex-col md:flex-row bg-black">
  //       <div className="p-7  border-b-2  md:border-r-2 md:min-h-screen md:w-1/4 ">
  //         <div className="flex justify-between items-center p-4 ">
  //           <div>
  //             <div className="flex items-center space-x-2">
  //               <span className="font-semibold flex items-center space-x-2 text-white hover:text-gray-800 bg-blue-300 p-2 rounded-tl-lg rounded-tr-lg">
  //                 <FaHome size={24} />
  //                 properties
  //               </span>
  //             </div>
  //           </div>
  //           <div>
  //             <Link
  //               to="/real-estate-deveoper"
  //               className={`text-gray-600 hover:text-gray-800 ${location.pathname === "/real-estate-deveoper"
  //                   ? "text-blue-100 bg-none "
  //                   : ""
  //                 }`}
  //             >
  //               <div className="flex items-center space-x-2 text-white">
  //                 <FaUser size={24} />
  //                 <span className="font-semibold">Developer</span>
  //               </div>
  //             </Link>
  //           </div>
  //         </div>

  //         <form onSubmit={handleSubmit} className="flex flex-col gap-8">
  //           <div className="flex items-center gap-2">
  //             {/* <label className="whitespace-nowrap font-semibold">
  //               Search Term:
  //             </label> */}
  //             <input
  //               type="text"
  //               id="searchTerm"
  //               placeholder="Search..."
  //               className="border rounded-lg p-3 w-full"
  //               value={sidebardata.searchTerm}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div className="flex gap-2 flex-wrap items-center text-white">
  //             <label className="font-semibold">Type:</label>
  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="all"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.type === "all"}
  //               />
  //               <span>All</span>


  //             </div>

  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="sale"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.type === "sale"}
  //               />
  //               <span>Sale</span>
  //             </div>

  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="buy"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.type === "buy"}
  //               />
  //               <span>Buy</span>
  //             </div>

  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="rent"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.type === "rent"}
  //               />
  //               <span>Rent</span>
  //             </div>

  //           </div>
  //           <div className="flex gap-2 flex-wrap items-center text-white">
  //             <label className="font-semibold">Amenities:</label>
  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="parking"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.parking}
  //               />
  //               <span>Parking</span>
  //             </div>
  //             <div className="flex gap-2">
  //               <input
  //                 type="checkbox"
  //                 id="furnished"
  //                 className="w-5"
  //                 onChange={handleChange}
  //                 checked={sidebardata.furnished}
  //               />
  //               <span>Furnished</span>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-2 text-white">
  //             <label className="font-semibold">Sort:</label>
  //             <select
  //               onChange={handleChange}
  //               defaultValue={"created_at_desc"}
  //               id="sort_order"
  //               className="border rounded-lg p-3"
  //             >
  //               <option value="priceMin_desc">Price high to low</option>
  //               <option value="priceMin_asc">Price low to hight</option>
  //               <option value="createdAt_desc">Latest</option>
  //               <option value="createdAt_asc">Oldest</option>
  //             </select>
  //           </div>

  //           <div className="flex gap-2 items-center w-full text-white">
  //             <label className="font-semibold">Investment Type:</label>
  //             <select
  //               onChange={handleChange}
  //               value={sidebardata.InvestmentType}
  //               id="InvestmentType"
  //               className="border rounded-lg p-3"
  //             >
  //               <option value="payment Plan">Payment Plan</option>
  //               <option value="handover">Handover</option>
  //               <option value="ready">Ready</option>
  //               <option value="all">All</option>

  //             </select>
  //           </div>
  //           <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
  //             Search
  //           </button>
  //         </form>
  //         <div className="mt-6 items-center justify-center hidden sm:block">
  //           {" "}
  //           <img src="https://res.cloudinary.com/dusfhr8a4/image/upload/f_auto,q_auto/um3c2nygafj21nxg381s" />
  //         </div>
  //       </div>
  //       <div className="flex-1 bg-black">
  //         <h1 className="text-3xl font-semibold p-3 text-white mt-5 text-center">
  //           Listing results
  //         </h1>


  //         <div className="p-7 flex flex-wrap gap-4">
  //           {!loading && listings.length === 0 && (
  //             <p className="text-xl text-white">No listing found!</p>
  //           )}
  //           {loading && (

  //             <main className="flex justify-center items-start min-h-screen py-7">
  //               <div className="flex justify-center items-center">
  //                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  //               </div>
  //             </main>


  //             // <p className="text-xl text-slate-700 text-center w-full">
  //             //   Loading...
  //             // </p>
  //           )}


  //           {!loading &&
  //             listings &&
  //             listings?.map((listing) => (
  //               <ListingItem key={listing._id} listing={listing} />
  //             ))}

  //           {showMore && (
  //             <button
  //               onClick={onShowMoreClick}
  //               className="text-green-700 hover:underline p-7 text-center w-full"
  //             >
  //               Show more
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div
      className="flex flex-col md:flex-row bg-black min-h-screen">
      {/* Sidebar */}
      <div
        className="p-6 md:min-h-screen md:w-1/4 bg-black">
        <div className="bg-gray-900 rounded-2xl shadow-x`l p-6 mt-20">
          <div
            className="flex justify-between items-center mb-6 text-white">
            <div className="flex items-center gap-2 font-semibold rounded bg-ARcolors-3000 p-2 mr-2">
              <FaHome size={24} />
              <span>{t("properties")}</span>
            </div>
            <Link
              to="/real-estate-deveoper"
              className={`hover:text-yellow-400 ${location.pathname === "/real-estate-deveoper" ? "text-yellow-400" : "text-white"
                }`}
            >
              <div className="flex items-center gap-2 ">
                <FaUser size={20} />
                <span className="font-semibold">{t("developer")}</span>
              </div>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-white">

            <input

              type="text"
              id="searchTerm"
              placeholder={t("search")}
              className="bg-white border border-gray-600 rounded-lg p-3 text-black font-bold"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />

            <div>
              <div className="flex items-start font-semibold ">


                <FaTags size={24} />
                <label className="block font-semibold mb-2 ml-2 underline">{t("type")}</label>
              </div>

              <div className="space-y-2">
                {["all", "sale", "buy", "rent"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={type}
                      className="w-5 h-5 accent-yellow-200"
                      onChange={handleChange}
                      checked={sidebardata.type === type}
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-start font-semibold ">

                <FaCar size={24} />
                <label className="block font-semibold mb-2 ml-2 underline">Amenities:</label>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5 h-5 accent-yellow-200"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>Parking</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5 h-5 accent-yellow-200"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span>Furnished</span>
                </label>
              </div>
            </div>

            <div >
              <div className="flex items-start font-semibold ">

                <FaSort size={24} />
                <label className="block font-semibold underline mb-2 ml-1">Sort:</label>
              </div>

              <select
                onChange={handleChange}
                defaultValue={"createdAt_desc"}
                id="sort_order"
                className="bg-white border border-gray-600 rounded-lg p-3 w-full text-black font-bold"
              >
                <option value="priceMin_desc">Price high to low</option>
                <option value="priceMin_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>

            <div>
              <div className="flex items-start font-semibold">

                <FaMoneyCheckAlt size={24} bg />
                <label className="block font-semibold mb-2 ml-2 underline">Investment Type:</label>
              </div>
              <select
                onChange={handleChange}
                value={sidebardata.InvestmentType}
                id="InvestmentType"
                className="bg-white border border-gray-600 rounded-lg p-3 w-full text-black font-bold"
              >
                <option value="payment Plan">Payment Plan</option>
                <option value="handover">Handover</option>
                <option value="ready">Ready</option>
                <option value="all">All</option>
              </select>
            </div>

            <button className="bg-ARcolors-3000 hover:bg-yellow-500 transition text-white font-bold p-3 rounded-lg uppercase ml-10 mr-10 mt-5">

              Search
            </button>

          </form>

          <div className="mt-8 hidden md:block">
            <img
              src="https://res.cloudinary.com/dusfhr8a4/image/upload/f_auto,q_auto/um3c2nygafj21nxg381s"
              alt="Banner"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black text-white">
        <h1 className="text-3xl font-semibold text-center p-6">{t("listing_results")}</h1>

        {/* <div className="p-7 flex flex-wrap gap-4 font-bold"> */}
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-bold">

          {!loading && listings.length === 0 && (
            <p className="text-xl">No listing found !</p>
          )}

          {loading && (
            <main className="flex justify-center items-start w-full py-7 ">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white "></div>
            </main>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <div className="flex items-center justify-center w-[900px]">
              <button
                onClick={onShowMoreClick}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-400"
              >
                Show More
              </button>
            </div>
          )}

        </div>
      </div >
    </div >

  )
}
