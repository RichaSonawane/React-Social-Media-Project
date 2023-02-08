require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {

    //  res.header("Access-Control-Allow-Origin", "http://localhost:4041"); // update to match the domain you will make the request from
    //  res.header(
    //    "Access-Control-Allow-Headers",
    //    "Origin, X-Requested-With, Content-Type, Accept"
    //  );
    //getting the token comes with request object in header of request out.

    const headerToken = req.get("Authorization");
    //let buff = Buffer.from(SECRET, "base64")
  
    //if header is without token then error should get logged.
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    console.log(headerToken);
    //initialise the variable called token
    let token;

    try {
      token = jwt.verify(headerToken, SECRET);
      //the new token variable should assign a value 
      //derives from jwt with help of received header token and SECRET maintained in .env file.
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      //if the token doesn't match then system should throw an error saying "not authenticated"
      error.statusCode = 401;
      throw error;
    }

    next();
  },
};
