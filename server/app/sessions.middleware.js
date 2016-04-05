var router = require('express').Router();
var session = require('express-session');
var User = require('../api/users/user.model');

router.use(session({
    secret: 'note' // or whatever you like
}));

router.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});

router.post('/login', function (req, res, next) {
	console.log(req.body);

	//res.send('hello');
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .exec()
    .then(function (user) {
        if (!user) {
            res.sendStatus(401);
        } else {
            console.log('user found', user);
            req.session.userId = user._id;
            res.sendStatus(200);
        }
    })
    .then(null, next);
});

router.post('/logout', function (req, res, next) {
    console.log('destroying');
    req.session.destroy();
    res.sendStatus(200);
});

router.get('/currentuser', function (req, res, next) {
    var userId = req.session.userId;
    User.findOne({
        _id: userId; 
    })
    .then(function(user) {
        res.json(user);
    })

});


module.exports = router;