import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "../../images/Loading.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PendingClientsBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  //getting books data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getPendingBookData`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      });
  }, []);

  //update book status
  const handleEdit = (bookId, status) => {
    const updateData = { status };

    // Make a PATCH request to update the book's status
    fetch(`${process.env.REACT_APP_BACKEND_URL}/updateBookStatus/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update successful:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  const handleDelete = (bookId) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/deletePendingBook/${bookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Remove the deleted book from the state
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      } else {
        console.error("Delete error:", data.message);
      }
    })
    .catch((error) => {
      console.error("Delete error:", error);
    });
};

  return (
    <div>
      {!books.length && <h1>No Pending Case Study</h1>}
      {books?.map((bookData, index) => (
        <div className="col-12 book_card mb-4" key={bookData?._id}>
          <div class="card book_card_body">
            <div class="row g-0">
              <div class="col-3 col-md-6">
                <LazyLoadImage
                  src={bookData?.bookImg}
                  alt=""
                  className="bookImage"
                  placeholderSrc={loader}
                  width={"100%"}
                  height={"auto"}
                />
              </div>
              <div class="col-9 col-md-6">
                <div className="bookFoot">
                  {/* <p className="b-name pt-2">{bookData?.bookName}</p> */}
                  <p className="b-name mb-0">
                    <b>Book Name: {bookData?.bookName}</b>
                  </p>
                  <p className="b-name">Author Name: {bookData?.authorName}</p>
                  <aside className="d-flex actionbtn">
                    {/* <Link to={`/viewPdf/${bookData?._id}`}>
                            <button className="viewBtn">View</button>
                          </Link> */}
                    <span>
                      <button
                        onClick={() => handleEdit(bookData._id, "active")}
                      >
                        Active Client Case Study
                      </button>

                          <button
                        onClick={() => handleDelete(bookData._id)}
                      >
                        Delete
                      </button>
                    </span>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingClientsBooks;
