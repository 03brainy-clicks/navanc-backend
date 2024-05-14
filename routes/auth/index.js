const { Router } = require("express");
const handleLogin = require("../../controller/auth");

const router = Router();

router.post("/login", handleLogin);

module.exports = router;
