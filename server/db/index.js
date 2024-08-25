const { query } = require("express");
const {Pool}=require("pg");
const pool=new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: "yelp",
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
}
);
module.exports={
    query:(text,params)=> pool.query(text,params),
}