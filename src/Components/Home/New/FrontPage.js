import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./New.css";
import axios from "axios";

import ReactHtmlParser from "react-html-parser";

const FrontPage = () => {
  const loginData = sessionStorage.getItem("loginDentalJournal24Data");

  const topImg =
    "https://res.cloudinary.com/dozt7xeil/image/upload/v1687025390/logo_rsefd3.png";
  const bottomImg =
    "https://res.cloudinary.com/dozt7xeil/image/upload/v1687025390/bottom-design_jcy5sy.png";

  return (
    <>
      <section className="front_page_background">
        <div className="top_logos">
          <img src={topImg} alt="" className="frontPage_image_right" />
        </div>
        <div className="front_content">
          <div className="button_auth">
            {loginData ? (
              <Link to="/home" className="btn frontPage_btn">
                Login/Register <i className="bi bi-chevron-double-right"></i>
              </Link>
            ) : (
              <Link to="/login" className="btn frontPage_btn">
                Login/Register <i className="bi bi-chevron-double-right"></i>
              </Link>
            )}
          </div>
        </div>
        <div className="bottom_logos">
          <img src={bottomImg} alt="" className="frontPage_image_bottom" />
        </div>
      </section>
    </>
  );
};

export default FrontPage;
