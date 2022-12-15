const { Router } = require("express");
const router = Router();

const { getDiets } = require("../controllers/diet.controller");

router.get("/types", getDiets);

module.exports = router;
