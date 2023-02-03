require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    //getting the token comes with request object in header of request out.
    const headerToken = req.get("Authorization");

    //if header is without token then error should get logged.
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

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
