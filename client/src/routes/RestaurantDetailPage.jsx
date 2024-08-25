import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

export const RestaurantDetailPage = (params) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    
  }, [id, setSelectedRestaurant]);
  console.log(selectedRestaurant);

  const handleHomeClick=()=>{
    navigate("/");
  }
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
  return (
    <div>    
      {selectedRestaurant && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{fontFamily:"sans-serif",flexGrow: 1, textAlign: "center"}}>{selectedRestaurant.restaurant.name}</h1>
            <button className="btn btn-info" onClick={handleHomeClick}>Home</button>
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          {renderRating(selectedRestaurant.restaurant)}
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}/>
            <br />
          </div>
          <AddReview/>
        </>
        
      )}
    </div>
  )
}
//export default RestaurantDetailPage;