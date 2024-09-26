const express = require("express");
const cookieParser = require("cookie-parser");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// MongoDB Models
const userModel = require("./models/user");
const postModel = require("./models/post.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mySecretKey = "ThisIsVerySecretKey";

// MiddleWares
function isLoggedIn(req, res, next) {
  if (req.cookies.token && req.cookies.token != "") {
    let data = jwt.verify(req.cookies.token, mySecretKey);
    req.user = data;
    next();
  }
  else {
    // res.send("You must be logged in");
    res.redirect("login")
  }
}

// get methods
app.get('/', (req, res) => {
  res.render("index");
})

app.get('/login', (req, res) => {
  res.render("login");
})

app.get('/logout', (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
})

app.get('/profile', isLoggedIn, async (req, res) => {
  //Populating the post ids.
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");;

  res.render("profile", { user });
})

// post methods
app.post('/register', async (req, res) => {
  let { name, username, age, email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (user)
    return res.status(500).send("User already exists");

  bcyrpt.genSalt(10, (err, salt) => {
    bcyrpt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash
      });

      let token = jwt.sign({ email: email, userid: user._id }, mySecretKey);
      res.cookie("token", token);
      res.send("Registered User: " + name);
    });
  });
});

app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user)
    return res.status(500).send("Something went wrong");


  bcyrpt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email, userid: user._id }, mySecretKey);
      res.cookie("token", token);
      // res.status(200).send("You can login");
      res.status(200).redirect("profile");
    }
    else
      res.redirect("login");
  })
});

app.post('/post', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email })
  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect("profile")
});

app.listen(3000);