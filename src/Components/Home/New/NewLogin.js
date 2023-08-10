import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./New.css";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const NewLogin = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const [loginData, setLoginData] = useState([]);
  const [notFoundError, setNotFoundError] = useState("");
  // react router dom path detect and go there
  let history = useHistory();

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = {
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value.toLocaleLowerCase(),
    };

    //getting data accoring to the input data from backend
    try {
      setLoading(true);
      const response = await fetch(
        `https://server.gynaecologyjournal.org/getAuthData?phoneNumber=${info?.phoneNumber}&password=${info?.password}`
      );
      const data = await response.json();

      //status ta shuddu logout thaklei session stroage a data dhukbe

      setLoginData(data);
      passwordRef.current.value = "";
      if (!loginData.length) {
        setError("Login failed, Contact with the authority");
      }
    } catch (error) {
      console.log("err", error);
      setNotFoundError(
        "Login failed, Re-check credentials or Contact to the admin"
      );
    }
    setLoading(false);
  };

  //setting data to the localstore and push it to the home page
  useEffect(() => {
    if (loginData.length) {
      sessionStorage.setItem(
        "loginGynaecologyJournalData",
        JSON.stringify(loginData)
      );
      history.push("/home");
    }
  }, [history, loginData]);

  //eye for password
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const topImg =
    "https://res.cloudinary.com/dozt7xeil/image/upload/v1687025390/logo_rsefd3.png";

  return (
    <section className="auth_background">
      <div className="top_logos">
        <img src={topImg} alt="" className="frontPage_image_right" />
      </div>
      <div className="container login_form">
        <h1>
          <strong>Login</strong>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="PhoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="PhoneNumber"
              aria-describedby="PhoneNumber"
              ref={phoneNumberRef}
              required
              placeholder="Type your phone number"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <span className="password_input">
              <input
                type={type}
                className="form-control"
                id="exampleInputPassword1"
                ref={passwordRef}
                required
                placeholder="Zif-A"
              />
              <span onClick={handleToggle} className="eye_icon">
                <Icon icon={icon} size={25} />
              </span>
            </span>
          </div>

          {error && (
            <p className="error my-2" onClose={() => setError(null)}>
              {error}
            </p>
          )}

          {notFoundError && (
            <p className="error my-2" onClose={() => setNotFoundError(null)}>
              {notFoundError}
            </p>
          )}

          <div className="login_btn">
            <button type="submit" className="btn auth_btn">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="text-center my-4">----------OR----------</div>
        <div className="login_footer">
          <Link to="/signUp" className="btn auth_btn">
            Sign Up <i className="bi bi-person-add"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewLogin;
