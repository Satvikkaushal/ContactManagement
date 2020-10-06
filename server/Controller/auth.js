const joi = require('joi');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");
var knex = require('knex')(require('../knexfile'))


const signInSchema = joi.object().keys({
    username: joi.string().email().required(),
    password: joi.string().required()
})

const signUpSchema = joi.object().keys({
    name: joi.string().required(),
    username: joi.string().email().required(),
    password: joi.string().required()
})
 exports.signIn =  (req, res) => {

    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        return res.json(validation.error)
    }
     knex.from('Admins').where('Admins.username', req.body.username)
        .then(rows =>
            rows.map(row => {
                if (row.password === req.body.password) {
                    const token = jwt.sign({ username: row.username }, process.env.secret)
                    res.cookie("token", token, { expire: new Date() + 10 })
                    return res.json({
                        token,
                        row
                    })
                }
                else {
                    return res.json({
                        msg: "password mismatch"
                    })
                }
            })
        )
        .catch(() => {
            return res.json({
                msg: "user not found"
            })
        })
}

exports.signUp = (req, res) => {

    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        return res.json(validation.error)
    }
    knex('Admins').insert({
        name: req.body.name, username: req.body.username, password: req.body.password
    })
        .then(function (result) {
            res.json({ success: true, message: 'Sucessfully Added Admin' });
        })
}

exports.isSignedIn = expressJwt({
    secret: process.env.secret,
    userProperty: "auth",
    algorithms: ['HS256']
})