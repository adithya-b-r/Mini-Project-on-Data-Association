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
  if (req.cookies.token === "")
    res.send("You must be logged in");
  else {
    let data = jwt.verify(req.cookies.token, mySecretKey);
    req.user = data;
    next();
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

app.get('/profile', isLoggedIn, (req, res) => {
  if (req.user)
    console.log(req.user);

  res.send("Meow {^_^}, This is Profile");
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
      res.status(200).send("You can login");
    }
    else
      res.redirect("login");
  })
});

app.listen(3000);