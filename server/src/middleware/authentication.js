const authenticate = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({ code: 'unauthorized', message: 'Unauthorized access' });
  };
  
  module.exports = { authenticate };