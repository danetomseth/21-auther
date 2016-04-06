'use strict';

var router = require('express').Router();
//url: /api/......

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

// router.use('/login', require('./login/login.router'));

module.exports = router;