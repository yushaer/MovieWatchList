import jwt from "jsonwebtoken";

import movieConfig from "../movie-config.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
 

    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, movieConfig.token_secret);

      req.userId = decodedData?.id;
      req.username=decodedData?.username;
 
    

    } 
    next();
  } catch (error) {
    console.log(error);
    res.status(401).JSON({message:"Invalid-Token"});
  }
};

export default auth;