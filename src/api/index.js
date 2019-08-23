const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("<h2>API version 1.0</h2>");
});

module.exports = router;
