const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV === "production") {
  const omwApiToken = process.env.TOKENKEY;
} else {
  const omwApiToken = require("../../token");
}

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  try {
    const token = authHeader;
    jwt.verify(token, omwApiToken);
    next();
  } catch (err) {
    return res.status().json(err);
  }
};
