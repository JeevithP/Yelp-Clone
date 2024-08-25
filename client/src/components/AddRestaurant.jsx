import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

export const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurants[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <h2>Add Restaurant</h2>
      <form action="">
        <div className="input-group">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Name"
            style={{ maxWidth: "250px", marginRight: "100px" }}
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Location"
            style={{ maxWidth: "250px", marginRight: "100px" }}
          />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="custom-select my-1 mr-sm-2"
            style={{ maxWidth: "200px", marginRight: "100px" }}
          >
            <option disabled>Price Range</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
          </select>
          <div className="input-group-append">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

//export default AddRestaurant;
