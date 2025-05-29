// src/middlewares/fakeAuth.js
module.exports = function fakeAuth(req, res, next) {
  const userId = req.header('x-user-id');
  if (userId) {
    req.user = { id: userId };
  }
  next();
};