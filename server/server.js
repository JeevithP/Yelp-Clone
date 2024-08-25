require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id order by average_rating desc;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    const reviews = await db.query("select * from reviews where restaurant_id=$1", [id]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const result = await db.query(
      "insert into restaurants (name, location, price_range) values($1, $2, $3) returning *",
      [name, location, price_range]
    );
    res.status(200).json({
      status: "Success",
      results: result.rowCount,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, price_range } = req.body;
  try {
    const result = await db.query(
      "update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *",
      [name, location, price_range, id]
    );
    if (result.rowCount) {
      res.status(200).json({
        status: "Success",
        results: result.rowCount,
        data: {
          restaurants: result.rows,
        },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Restaurant not found",
      });
      console.log("ID not present");
    }
  } catch (err) {
    console.log(err);
  }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // First delete all reviews related to the restaurant
    await db.query("DELETE FROM reviews WHERE restaurant_id = $1", [id]);
    // Then delete the restaurant
    const result = await db.query("DELETE FROM restaurants WHERE id = $1 returning *", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        deletedRest: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

// add a review
app.post("/api/v1/restaurants/:id/addReview",async(req,res)=>{
    const {name,review,rating}=req.body;
    const id=req.params.id;
    try{
        const result=await db.query("insert into reviews (name,rating,review,restaurant_id) values($1,$2,$3,$4) returning *",[name,rating,review,id]);
        res.status(200).json({
            status:"success",
            review:result.rows
        })
    }catch(err){
        console.log(err);
    }
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
