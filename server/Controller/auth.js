const joi = require('joi');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");
var knex = require('knex')(require('../knexfile'))


const signInSchema = joi.object().keys({
    username: joi.string().email().required(),
    password: joi.string().required()
})

const signUpSchema = joi.object().keys({
    username: joi.string().email().required(),
    password: joi.string().required()
})

exports.signIn = (req, res) => {

    console.log("signIn")

    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        console.log("failed");
        return res.json(validation.error)
    }
    knex.from('Admins').where('Admins.username', req.body.username)
        .then(rows =>
            rows.map(row => {
                if (row.password === req.body.password) {
                    const token = jwt.sign({ username: row.username }, "Secret")
                    res.cookie("token", token, { expire: new Date() + 10 })
                    return res.json({
                        token,
                        row
                    })
                }
                else {
                    return res.json({
                        msg: "mismatch"
                    })
                }
            })
        )
}

exports.signUp = (req, res) => {

    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        console.log("failed");
        return res.json(validation.error)
    }
    knex('Admins').insert({
        username: req.body.username, password: req.body.password
    })
        .then(function (result) {
            console.log("done")
            res.json({ success: true, message: 'Sucessfully Added Admin' });
        })
}

exports.isSignedIn = expressJwt({
    secret: "Secret",
    userProperty: "auth",
    algorithms: ['HS256']
})