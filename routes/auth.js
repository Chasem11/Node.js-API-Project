const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post(
    '/signup',
    [
        check('username', 'Please enter a valid username').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({
                username,
                email,
                password
            });

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 10000 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error in saving');
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not exists' });
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;