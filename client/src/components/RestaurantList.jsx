import React, { useContext, useEffect, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { Filter } from './Filter';

export const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        setFilteredRestaurants(response.data.data.restaurants); // Set initial filtered restaurants
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
      setFilteredRestaurants(filteredRestaurants.filter(restaurant => restaurant.id !== id));
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  const applyFilters = (priceRange, sortOrder) => {
    let filtered = [...restaurants];

    if (priceRange) {
      filtered = filtered.filter(restaurant => parseInt(restaurant.price_range) <= parseInt(priceRange));
    }

    if (sortOrder) {
      if (sortOrder === "lowToHigh") {
        filtered = filtered.sort((a, b) => a.average_rating - b.average_rating);
      } else if (sortOrder === "highToLow") {
        filtered = filtered.sort((a, b) => b.average_rating - a.average_rating);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(restaurant => restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredRestaurants(filtered);
  };

  const resetFilters = () => {
    setFilteredRestaurants(restaurants);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters("", ""); // Apply filters with the current search query
  };

  return (
    <div className="list-group">
      <Filter onApplyFilters={applyFilters} onResetFilters={resetFilters} onSearch={handleSearch} />
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col" style={{ backgroundColor: "blue" }}>Restaurant</th>
            <th scope="col" style={{ backgroundColor: "blue" }}>Location</th>
            <th scope="col" style={{ backgroundColor: "blue" }}>Price Range</th>
            <th scope="col" style={{ backgroundColor: "blue" }}>Ratings</th>
            <th scope="col" style={{ backgroundColor: "blue" }}>Edit</th>
            <th scope="col" style={{ backgroundColor: "blue" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredRestaurants && filteredRestaurants.map(restaurant => (
            <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)} style={{ cursor: 'pointer' }}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{restaurant.price_range}</td>
              <td>{renderRating(restaurant)}</td>
              <td>
                <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
              </td>
              <td>
                <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
