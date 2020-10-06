const express = require('express');
const { signIn, signUp } = require('../Controller/auth');
const router = express.Router();

router.post("/signIn", signIn)

router.post("/signUp", signUp);

router.get("/signOut", (req, res) => {
    res.send("Signing out");
})

module.exports = router;