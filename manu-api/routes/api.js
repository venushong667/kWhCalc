var express = require("express");
var router = express.Router();
const { getData, addData, delData, CalcKWH } = require("../handlers/data");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/data", getData);
router.post("/data", addData);
router.delete("/data", delData);
router.post("/kwh", CalcKWH);

module.exports = router;
