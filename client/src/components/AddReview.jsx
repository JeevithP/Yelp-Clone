import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  console.log(id);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      
      //console.log(location.pathname);
      //navigate(location.pathname);
    } catch (err) {}
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8" style={{marginTop:"30px"}}>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4" style={{marginTop:"20px"}}>
            <label htmlFor="rating">Rating   </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
              style={{marginLeft:"20px"}}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group" style={{marginTop:"30px"}}>
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={(e)=>handleSubmitReview(e)}
          className="btn btn-primary"
          style={{marginTop:"30px"}}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;