// import { useSelector } from 'react-redux';
// import { useRef, useState, useEffect } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
// } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);
//   const dispatch = useDispatch();

//   const listingsRef = useRef(null);



//   // firebase storage
//   // allow read;
//   // allow write: if
//   // request.resource.size < 2 * 1024 * 1024 &&
//   // request.resource.contentType.matches('image/.*')

//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(data.message));
//     }
//   };


//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();

//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }

//       setUserListings(data);

//       // Wait for a short delay before scrolling to the top
//       setTimeout(() => {
//         if (listingsRef.current) {
//           listingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' , inline: 'nearest'});
//         }
//       }, 500); // Adjust the delay time (in milliseconds) as needed
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };



//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type='file'
//           ref={fileRef}
//           hidden
//           accept='image/*'
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={formData.avatar || currentUser.avatar}
//           alt='profile'
//           className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
//         />
//         <p className='text-sm self-center'>
//           {fileUploadError ? (
//             <span className='text-red-700'>
//               Error Image upload (image must be less than 2 mb)
//             </span>
//           ) : filePerc > 0 && filePerc < 100 ? (
//             <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
//           ) : filePerc === 100 ? (
//             <span className='text-green-700'>Image successfully uploaded!</span>
//           ) : (
//             ''
//           )}
//         </p>
//         <input
//           type='text'
//           placeholder='username'
//           defaultValue={currentUser.username}
//           id='username'
//           className='border p-3 rounded-lg'
//           onChange={handleChange}
//         />
//         <input
//           type='email'
//           placeholder='email'
//           id='email'
//           defaultValue={currentUser.email}
//           className='border p-3 rounded-lg'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           placeholder='password'
//           onChange={handleChange}
//           id='password'
//           className='border p-3 rounded-lg'
//         />
//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Update'}
//         </button>
//         <Link
//           className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
//           to={'/create-listing'}
//         >
//           Create Listing
//         </Link>
//       </form>
//       <div className='flex justify-between mt-5'>
//         <span
//           onClick={handleDeleteUser}
//           className='text-red-700 cursor-pointer'
//         >
//           Delete account
//         </span>
//         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
//           Sign out
//         </span>
//       </div>

//       <p className='text-red-700 mt-5'>{error ? error : ''}</p>
//       <p className='text-green-700 mt-5'>
//         {updateSuccess ? 'User is updated successfully!' : ''}
//       </p>
//       <button  onClick={handleShowListings} className='text-green-700 w-full'>
//         Show Listings
//       </button>
//       <p className='text-red-700 mt-5'>
//         {showListingsError ? 'Error showing listings' : ''}
//       </p>

//       {userListings && userListings.length > 0 && (
//   <div ref={listingsRef} className='flex flex-col gap-4'>
//     <h1 className='text-center mt-7 text-2xl font-semibold'>
//       Your Listings
//     </h1>

//     {userListings.slice().reverse().map((listing) => (
//       <div
//         key={listing._id}
//         className='border rounded-lg p-3 flex justify-between items-center gap-4'
//       >
//         <Link to={`/listing/${listing._id}`}>
//           <img
//             src={listing.imageUrls[0]}
//             alt='listing cover'
//             className='h-16 w-16 object-contain'
//           />
//         </Link>
//         <Link
//           className='text-slate-700 font-semibold  hover:underline truncate flex-1'
//           to={`/listing/${listing._id}`}
//         >
//           <p>{listing.name}</p>
//         </Link>

//         <div className='flex flex-col item-center'>
//           <button
//             onClick={() => handleListingDelete(listing._id)}
//             className='text-red-700 uppercase'
//           >
//             Delete
//           </button>
//           <Link to={`/update-listing/${listing._id}`}>
//             <button className='text-green-700 uppercase'>Edit</button>
//           </Link>
//         </div>
//       </div>
//     ))}
//   </div>
// )}


// </div>
//   );}




import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const dispatch = useDispatch();
  const listingsRef = useRef(null);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };




  const handleDeleteAccount = () => {
    setShowDeleteAccountPopup(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    } finally {
      setShowDeleteAccountPopup(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteAccountPopup(false);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);

      // Wait for a short delay before scrolling to the top
      setTimeout(() => {
        if (listingsRef.current) {
          listingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 500); // Adjust the delay time (in milliseconds) as needed
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    setListingToDelete(listingId);
    setShowPopup(true);
  };

  const confirmDeleteListing = async () => {
    try {
      const res = await fetch(`/api/listing/delete/${listingToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingToDelete)
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setShowPopup(false);
      setListingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setListingToDelete(null);
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen bg-black">


      <div className='p-3 max-w-xl mx-auto bg-white rounded-xl'>
        <h1 className='text-3xl font-semibold text-center my-7'>{t("profile")}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>
                {t("img_error")}
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>{t("img_success")}</span>
            ) : (
              ''
            )}
          </p>
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='text'
            placeholder={t("username")}
            defaultValue={currentUser.username}
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='email'
            placeholder={t("e-mail")}
            id='email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            type='password'
            placeholder={t("pass")}
            onChange={handleChange}
            id='password'
            className='border p-3 rounded-lg'
          />
          <button
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            disabled={loading}
            className={`bg-black text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ${isArabic ? 'text-xl' : ''}`}
          >
            {loading ? t('loading') : t('update')}
          </button>
          <Link
            className={`bg-yellow-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 ${isArabic ? 'text-xl' : ''}`}
            to={'/create-listing'}
          >
            {t("create_listing")}
          </Link>
        </form>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

          className='flex justify-between mt-5'>
          <span
            onClick={handleDeleteAccount}
            className='text-red-700 cursor-pointer font-bold'
          >
            {t("delete_account")}
          </span>
          {/* 
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span> */}
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer font-bold'>
            {t("sign_out")}
          </span>
        </div>

        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess ? 'User is updated successfully!' : ''}
        </p>
        <button onClick={handleShowListings} className='text-yellow-700 w-full font-bold'>
          {t("show_listing")}
        </button>
        <p className='text-red-700 mt-5'>
          {showListingsError ? 'Error showing listings' : ''}
        </p>

        {userListings && userListings.length > 0 && (
          <div ref={listingsRef} className='flex flex-col gap-4'>
            <h1 className='text-center mt-7 text-2xl font-semibold'>
              {t("yout_listings")}
            </h1>

            {userListings.slice().reverse().map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold hover:underline truncate flex-1'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className='flex flex-col item-center'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className={`text-red-700 uppercase ${i18n.language === 'ar' ? 'font-bold' : ''}`}
                  >
                    {t("delete")}
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button
                      className={`text-yellow-600 uppercase ${i18n.language === 'ar' ? 'font-bold' : ''}`}
                    >
                      {t("edit")}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {showPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
              <button onClick={cancelDelete} className='absolute top-2 right-2 text-xl'>&times;</button>
              <p className='text-center mb-4'>{t("are_you_sure_delete_listing")}</p>
              <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

                className='flex justify-center gap-4'>
                <button onClick={confirmDeleteListing} className='bg-red-700 text-white px-4 py-2 rounded-lg'>{t("yes")}</button>
                <button onClick={cancelDelete} className='bg-gray-700 text-white px-4 py-2 rounded-lg'>{t("no")}</button>
              </div>
            </div>
          </div>
        )}


        {showDeleteAccountPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
              <button onClick={cancelDeleteAccount} className='absolute top-2 right-2 text-xl'>&times;</button>
              <p className='text-center mb-4'>{t("are_you_sure_delete_account")}</p>
              <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}

                className='flex justify-center gap-4'>
                <button onClick={confirmDeleteAccount} className='bg-red-700 text-white px-4 py-2 rounded-lg'>{t("yes")}</button>
                <button onClick={cancelDeleteAccount} className='bg-gray-700 text-white px-4 py-2 rounded-lg'>{t("no")}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
