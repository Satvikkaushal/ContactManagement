const express = require('express');
const { isSignedIn } = require('../Controller/auth');
const { getallUser, addUser, updateUser, getUserNumber, getUserById, getUserEmails, userById } = require('../Controller/User');
const router = express.Router();

router.param("userId", userById)
router.post("/addContact", isSignedIn, addUser);
router.post("/updateContact", isSignedIn, updateUser)
router.get("/allUser", isSignedIn, getallUser)
router.get("/user/numbers/:userId", isSignedIn, getUserNumber)
router.get("/user/emails/:userId", isSignedIn, getUserEmails)
router.get("/user/:userId", isSignedIn, getUserById)

module.exports = router;