const jwt = require("jsonwebtoken");
let omwApiToken;
if (process.env.NODE_ENV === "production") {
  omwApiToken = process.env.TOKENKEY;
} else {
  omwApiToken = require("../../token");
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
