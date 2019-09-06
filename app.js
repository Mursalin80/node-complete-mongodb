const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { mongoConnect } = require("./util/database");
const User = require("./models/User");

const { adminRouter } = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

const { get404 } = require("./controllers/404"); //  get 404 controller

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5d6fe79269e41a3df4f6f2ec")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRouter);
app.use(shopRouter);

// use 404 page controller if no page found
app.use(get404);

mongoConnect(() => {
  app.listen(3000);
});

//console.log("App.js directy Path ", __dirname);
