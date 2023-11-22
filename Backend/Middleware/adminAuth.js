
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  
  const token = req.headers.authorization      // Assuming you send the token in the 'x-auth-token' header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.adminId = decoded.adminId;         
    next();
    
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {authenticateAdmin};
