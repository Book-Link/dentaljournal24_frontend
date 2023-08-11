import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./New.css";

const FrontPage = () => {
  const loginData = sessionStorage.getItem("loginDentalJournal24Data");


  return (
    <>
      <section className="front_page_background">
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
      </section>
    </>
  );
};

export default FrontPage;
