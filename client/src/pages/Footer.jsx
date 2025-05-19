import React from 'react';
import { FaYoutube, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaPinterest, FaSnapchat, FaTiktok, FaTelegram, FaTwitter } from 'react-icons/fa'; // Corrected import statement
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";



const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className=" text-white py-8 bg-black">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 px-4 mb-6 bg-slate-1000 text-center">
          <h2 className="text-2xl ARcolors-2000 font-bold mb-4 text-center">{t("AR_REALSTATE")}</h2>
          <p>
            {t("Explore_AR_Real_Estate,your_gateway_to_exquisite_properties.From_luxurious_villas_to_elegant_apartments,we_offer_a_tailored_real_estate_experience_to_help_you_find_your_dream_home.")}
          </p>

        </div>
        <div className="w-full md:w-1/3 px-4 mb-6 ARcolors-1000 text-center">
          <h2 className="text-2xl font-bold mb-4 ARcolors-2000 text-center">Location</h2>
          <ul>
            <li>Country: United Arab Emirates </li>
            <li> City: Dubai </li>
            <li>Current Location: Dubai, Business Bay </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-6 ARcolors-1000 text-center">
          <h2 className="text-2xl font-bold mb-4 ARcolors-2000 text-center">Contacts</h2>
          <ul >
            <li>Phone:+971562929527 </li>
            <li>Company: HYZ Investment L.L.C</li>

            {/* <div className="flex flex-wrap mt-4 w-full">
  <div className="flex justify-start w-full ">
    <a href="https://www.youtube.com/channel/UClIuZ3967zV4SsRveP4fvoQ" className="mr-4"><FaYoutube /></a>
    <a href="https://www.linkedin.com/in/ar-realstate/" className="mr-4"><FaLinkedin /></a>
    <a href="https://www.instagram.com/arrealstate/" className="mr-4"><FaInstagram /></a>

    <a href="https://api.whatsapp.com/send/?phone=971562929527" className="mr-4"><FaWhatsapp /></a>
    <a href="https://whatsapp.com/channel/0029VaQHfLH9sBI2tctAkf1i " className="mr-4"><FaWhatsapp /></a>

    <a href="https://www.pinterest.com/AR_RealState/" className="mr-4"><FaPinterest /></a>
    <a href="https://www.snapchat.com/add/ar_realstate?share_id=YjDIC5RZ6Dg&locale=ar-EG" className="mr-4"><FaSnapchat /></a>
    <a href="https://www.tiktok.com/@arrealstate" className="mr-4"><FaTiktok /></a>
    <a href="https://t.me/arrealstate" className="mr-4"><FaTelegram /></a>
    <a href="https://twitter.com/arrealstate" className="mr-4"><FaXTwitter /></a>
</div>
</div> */}


            <div className="flex flex-wrap mt-4 w-full justify-center">
              <div className="grid grid-cols-10 gap-4">
                <a href="https://www.youtube.com/channel/UClIuZ3967zV4SsRveP4fvoQ"><FaYoutube /></a>
                <a href="https://www.linkedin.com/in/ar-realstate/"><FaLinkedin /></a>
                <a href="https://www.instagram.com/arrealstate/"><FaInstagram /></a>
                <a href="https://api.whatsapp.com/send/?phone=971562929527"><FaWhatsapp /></a>
                <a href="https://whatsapp.com/channel/0029VaQHfLH9sBI2tctAkf1i "><FaWhatsapp /></a>
                <a href="https://www.pinterest.com/AR_RealState/"><FaPinterest /></a>
                <a href="https://www.snapchat.com/add/ar_realstate?share_id=YjDIC5RZ6Dg&locale=ar-EG"><FaSnapchat /></a>
                <a href="https://www.tiktok.com/@arrealstate"><FaTiktok /></a>
                <a href="https://t.me/arrealstate"><FaTelegram /></a>
                <a href="https://twitter.com/arrealstate"><FaXTwitter /></a>
              </div>
            </div>

          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

