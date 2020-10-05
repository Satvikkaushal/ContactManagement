const express = require('express');
const { isSignedIn } = require('../Controller/auth');
const { getallUser, addUser, updateUser,getUserNumber,getUserById,getUserEmails,userById } = require('../Controller/User');
const router = express.Router();

router.param("userId",userById)



router.post("/addContact",isSignedIn, addUser);
router.post("/updateContact",isSignedIn, updateUser)
router.get("/allUser", getallUser)
router.get("/user/numbers/:userId",getUserNumber)
router.get("/user/emails/:userId",getUserEmails)
router.get("/user/:userId",getUserById)



module.exports = router;