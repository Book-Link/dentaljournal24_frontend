import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./New.css";

const NewSignup = () => {
  let history = useHistory();
  const [error, setError] = useState("");
  const [uniqueMsg, setUniqueMsg] = useState("");
  const [term, setTerm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();

  //fixed password
  const passRef = "Zif-A";

  // sign with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const singupData = {
      name: nameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      password: passRef.toLocaleLowerCase(),
      // confirmPassword: confirmPasswordRef.current.value,
      active: true,
    };

    // add product info at mongodb
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/addSignupData`;
      const option = {
        method: "POST",
        body: JSON.stringify(singupData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      //for same email
      if (response.status === 400) {
        setUniqueMsg("User Already Exist");
        setTimeout(() => {
          setUniqueMsg("");
        }, 4000);
      }
      //success Email
      if (response.status === 200) {
        setSuccessMsg(
          "Congratulations! Your account has been successfully created."
        );
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/login");
        }, 2000);
      }

      //for input remove after data added
      if (data) {
        nameRef.current.value = "";
        phoneNumberRef.current.value = "";
        emailRef.current.value = "";
        addressRef.current.value = "";
        // passwordRef.current.value = "";
      }
    } catch (error) {
      console.log("err", error);
    }
    setLoading(false);
  };

  const topImg =
    "https://res.cloudinary.com/dozt7xeil/image/upload/v1687025390/logo_rsefd3.png";

  return (
    <section className="auth_background">
      <div className="top_logos">
        <img src={topImg} alt="" className="frontPage_image_right" />
      </div>
      <div className="container sign_up_form">
        <h1>
          <strong>Sign Up</strong>
        </h1>
        <form className="row g-3 px-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label for="inputName" className="form-label">
              Dr. Name
            </label>
            <aside className="dr_name_input">
              <span>Dr.</span>
              <input
                type="text"
                className="form-control dr_name_input_field"
                id="inputName"
                placeholder="Kushal"
                ref={nameRef}
                required
              />
            </aside>
          </div>
          <div className="col-md-6">
            <label for="inputNumbar" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="inputNumbar"
              placeholder="015 1234 5678"
              ref={phoneNumberRef}
              pattern="[0-9]{11}"
              required
            />
          </div>

          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="example@gmail.com"
              ref={emailRef}
              required
            />
          </div>

          <div className="col-md-6">
            <label for="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="type address"
              ref={addressRef}
              required
            />
          </div>

          <div className="col-12">
            <div className="form-check d-flex align-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                onClick={() => setTerm(!term)}
                required
              />
              <label className="form-check-label" for="gridCheck">
                I accept all the terms and conditions
              </label>
            </div>
          </div>
          {/* all kinds of message  */}
          {successMsg && (
            <p className="success my-2" onClose={() => setSuccessMsg(null)}>
              {successMsg}
            </p>
          )}
          {uniqueMsg && (
            <p className="error my-2" onClose={() => setUniqueMsg(null)}>
              {uniqueMsg}
            </p>
          )}
          {error && (
            <p className="error my-2" onClose={() => setError(null)}>
              {error}
            </p>
          )}

          <div className="col-12">
            {term === false ? (
              <button
                type="submit"
                className="btn auth_btn d-grid mx-auto w-100 disabled"
                title="Please press the agree check-box"
              >
                Registration
              </button>
            ) : (
              <button
                type="submit"
                className="btn auth_btn d-grid mx-auto w-100"
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Registration"
                )}
              </button>
            )}
          </div>
        </form>
        <div className="text-center my-4">----------OR----------</div>
        <div className="signup_footer">
          <Link to="/login" className="btn auth_btn">
            Login <i className="bi bi-person-check"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewSignup;
