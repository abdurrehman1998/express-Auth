const express = require('express');
const router = express.Router();
const user=require('../controllers/users');

/* Post data */
router.post('/',user.signUp);
router.post('/login',user.signIn);

module.exports = router;
