const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * Post route for creating a new user.
 * 
 * @name POST: /users/
 * 
 * @param {string} name - Name of user
 * @param {string} email - Email of customer
 * @param {password} password - Password of customer
 */
router.post('/', (req, res) => {
    const newUser = new User(({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }))

    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
});


/**
 * Get route for fetching all users from users collection.
 * 
 * @name GET: /users/
 */
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err)) 
});


/**
 * Get route for fetching all the posts of a user.
 * 
 * @name POST: /posts/
 * 
 * @param {string} email - Email of customer
 */
router.post('/posts', (req, res) => {
    // User model (mongoose) will find an email from req.body
    User.findOne({email: req.body.email})
        // Once mongo responds...
        .then( user => {
            // Post model (mongoose) will search for user
            Post.find({user: user})
                // Then when mongo responds...
                .then(posts => {
                    // res (express) will output the result
                    res.json(posts)
                })
                // If Post model fails, log the error
                .catch(err => console.log(err)) 
        })
        // If User model fails, log the error.
        .catch(err => res.json(err))
});

module.exports = router;
