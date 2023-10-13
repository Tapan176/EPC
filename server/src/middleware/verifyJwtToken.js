const jwt = require('jsonwebtoken');

const verifyJwtToken = (req, res, next) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      next();
    } else {
      throw new Error('invalid_token');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyJwtToken };