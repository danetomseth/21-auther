var session = require('express-session');


app.use(session({
    secret: 'note' // or whatever you like
}));