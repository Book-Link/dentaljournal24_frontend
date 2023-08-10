import React, { useEffect, useState } from "react";
import "./BookList.css";
import { Link } from "react-router-dom";

const AllUser = () => {
  const [user, setUser] = useState([]);

  //all users
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getAllUser`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchProduct();
  }, []);

  //user delete
  const handleUserDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userDelete/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result) {
        console.log("deleted successfully");
      }

      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (error) {
      console.error(error);
    }
  };

  //user Update
  const handleUserUpdate = async (value, id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userUpdate/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: value,
          }),
        }
      );
      const result = await response.json();
      if (result) {
        console.log("updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="container">
      <Link to="/dashboard" className="back">
        {" "}
        <i className="bi bi-skip-backward-fill"></i> Back{" "}
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Control</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((dt, index) => (
            <tr key={dt?._id}>
              <th scope="row">{index + 1}</th>
              <td className="dr_name">{dt?.name}</td>
              <td>{dt.address}</td>
              <td>{dt?.email}</td>
              <td>{dt?.phoneNumber}</td>
              <td>
                <button
                  className={`btn pause_btn ${!dt.active ? "stop" : ""}`}
                  onClick={() => handleUserUpdate(false, dt?._id)}
                >
                  Stop
                </button>{" "}
                <button
                  className={`btn pause_btn ${dt.active ? "active" : ""}`}
                  onClick={() => handleUserUpdate(true, dt?._id)}
                >
                  Start
                </button>{" "}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleUserDelete(dt?._id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
