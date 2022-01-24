const router = require("express").Router();
const { User, validate } = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Token = require('../models/Token')
const crypto = require('crypto')



router.get("/signup", (req, res, next) => {
    res.status(200).send({ message: 'all good' })
});

router.get("/log-in", (req, res, next) => {
    res.render("log-in")
})
// .POST ROUTES HERE

router.post('/log-in', passport.authenticate('local', {

    successRedirect: '/profile',
    failureRedirect: '/log-in',
    passReqToCallback: true

}))

router.post('/signup', async (req, res) => {
    try {
        const {
            error,
        } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { email, name, password } = req.body;

        if (name.length < 4) {
            return res.status(400).send({ message: 'email must be longer than 4 characters' })
        } else if (password.length < 4) {
            return res.status(400).send({ message: 'password must be longer than 4 characters' })
        };

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send(({ message: 'A user with this email address already exists' }));
        };

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({ email, name, password: hashedPassword });

        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })

        const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;

    } catch (error) {
        res.send('An error occured');
        console.log(error);
    };
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('log-in')
});

module.exports = router;