import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
 const UpdateRestaurant = (props) => {
    const {id}=useParams();
    const {restaurant}=useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          const response = await RestaurantFinder.get(`/${id}`);
          console.log(response.data.data);
          setName(response.data.data.restaurant.name);
          setLocation(response.data.data.restaurant.location);
          setPriceRange(response.data.data.restaurant.price_range);
        };

        console.log(name);
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        navigate("/");
    };
    
  return (
    <div>
        <form action="">
        <div className="form-group" style={{marginTop:20}}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group" style={{marginTop:20}}>
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" style={{marginTop:20}}>
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{marginTop:20}}
        >
          Update
        </button>
      </form>
    </div>
  )
}
export default UpdateRestaurant;
