const User = require('../models/user');
module.exports = (router) => {
    router.post('/register', (req, res) => {


        if (!req.body.email) {
            res.json({ success: false, message: 'please provide email' })
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'please provide Username' })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'please provide Password' })
                } else {

                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    })
                    user.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                res.json({ success: false, message: 'username or email already exist' })
                            } else {
                                res.json({ success: false, message: 'user not saved , Error:' + err })
                            }

                        } else {
                            res.json({ success: true, message: 'user saved' })
                        }
                    });
                }
            }
        }
    })
    return router;
}