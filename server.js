const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();

const db = "mongodb+srv://Meghana:astrolabs@cluster0-u5bwq.mongodb.net/test?retryWrites=true&w=majority";

app.use (bodyParser.urlencoded({ extended: false }))
mongoose
.connect( db,{})
.then(()=> console.log("Db Connected"))
.catch( err => console.log(err));


app.get('/', (req,res) => res.json({
	msg: "Hello! friends !!! 😊"
}));

app.post('/users', (req, res) => {
	const newUser = new User({
	    name: req.body.name,
	    email: req.body.email,
	    password: req.body.password
	});

	newUser
	    .save()
	    .then(user => res.json(user))
	    .catch(err => res.json(err));
});

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
	    .catch(err => console.log(err))

});

const userRoutes = require('./routes/User')
app.use('/users', userRoutes);

app.post('/posts', (req, res) => {
    User
    .findOne({email: req.body.email})
    .then( user => {
        console.log("User found", user);
        if (user) {
            const newPost = new Post({
                message: req.body.message,
                user: user
            })
            newPost
                .save()
                .then(post=> res.json (post))
                .catch(err => res.json(err))
        } else {
            return res.status(400).json({message: "User not found"})
        }
    })
});

//Method: GET
// Route to fetch all the posts from collection
app.get('/posts', (req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.log(err)) 
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Your application is runnint @ http://localhost:${port}`));



