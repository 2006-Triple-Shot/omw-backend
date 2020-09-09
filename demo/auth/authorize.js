const jwt = require("jsonwebtoken");
const secret = require("../../publicsecret");
// const omwApiToken = require("../../token");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  try {
    const token = authHeader;
    jwt.verify(token, secret.publicSecret);
    next();
  } catch (err) {
    return res.status().json(err);
  }
};
