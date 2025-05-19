import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Notification.css';
import { useTranslation } from "react-i18next";
import "../../i18n";



function Notification() {
  const [showNotification, setShowNotification] = useState(true);
  const { t, i18n } = useTranslation();

  //   // Function to hide the notification after 3 minutes
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setShowNotification(false);
  //     }, 180000); // 3 minutes in milliseconds

  //     // Clear the timer when the component unmounts or the notification is hidden
  //     return () => clearTimeout(timer);
  //   }, []);

  //   // Function to handle hiding the notification when clicking on the "x" button
  //   const handleCloseNotification = () => {
  //     setShowNotification(false);
  //   };

  return (
    <div
      className={`notification-container ${showNotification ? 'visible' : 'hidden'}`}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="notification-content bg-ARcolors-1000 ARcolors-1000 rounded p-3 flex items-center">
        <p className="notification-text text-lg w-full">
          <Link to="/developer?id=6595af15358f56eaf4a37737" className="flex items-center gap-2 pr-4">
            <strong className="px-3 ARcolors-3000 text-2xl">{t("new_launch_of_motorcity")}</strong>
            <span className="font-bold ARcolors-2000 text-2xl">{t("discover_exclusive_shoba_project")}</span>
          </Link>
        </p>
      </div>
    </div>

  );
}

export default Notification;
