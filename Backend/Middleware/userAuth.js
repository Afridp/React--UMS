const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization  
  if (!token) {
    console.log("not have token");
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    console.log("have token");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.userId; // Add the adminId to the request object for later use
    next();
  } catch (err) {
    console.log("invalid");
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {authenticateUser};
