
const knex = require("knex")(require("../knexfile"))

exports.getallUser = (req, res) => {
    knex.from('userInfo').then(data => res.json(data))
}

exports.addUser = (req, res) => {
    knex('userInfo').insert({
        username: req.body.contactName, email: req.body.email, PhoneNumber: req.body.contactNumber
    })
        .then(data => {
            res.json({
                msg: "added sucesfully"
            })
        })
}

exports.updateUser = (req, res) => {
    console.log("update contact")
    if (req.body.Number) {
        knex('userAlternateNumbers').insert({
            user_id: req.body.id, AlternateNo: req.body.Number
        }).then(data => {
            res.json({
                msg: "added sucesfully"
            })
        })
    }
    if (req.body.email) {
        knex('userAlternateEmail').insert({
            user_id: req.body.id, AlternateEmail: req.body.email
        }).then(data => {
            res.json({
                msg: "added sucesfully"
            })
        })
    }
}

exports.getUserNumber = (req,res)=>{

knex.from('userAlternateNumbers').where('userAlternateNumbers.user_id',req.profile).then(data=>res.json(data))
}

exports.getUserEmails=(req,res)=>{
    knex.from('userAlternateEmail').where('userAlternateEmail.user_id',req.profile).then(data=>res.json(data))
}

exports.getUserById = (req,res)=>{
    knex.from('userInfo').where('userInfo.id',req.profile).then(data=>res.json(data))
}

exports.userById = (req,res,next,id)=>{
req.profile = id;
next();
}