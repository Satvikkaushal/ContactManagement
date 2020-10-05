const express = require('express');
const { signIn, signUp } = require('../Controller/auth');
const router = express.Router();

router.post("/signIn", signIn)

router.post("/signUp", signUp);

router.get("/signOut", (req, res) => {
    console.log("Came in");
    res.send("Hello world");
})

router.post("/addAdmin", (req, res) => {
    console.log(req.body);
    return knex('Admins').insert({ id: req.body.id, username: req.body.username, password: req.body.password })
        .then(function (result) {
            console.log("done")
            res.json({ success: true, message: 'Sucessfully Added Admin' });
        })
})

module.exports = router;