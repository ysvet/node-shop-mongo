const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d4a90e4ff84fc05e873c470')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://ysvet:lUyKSmiT4iELOkGR@cluster0-7fmhc.mongodb.net/shop?retryWrites=true&w=majority')
  .then( result => {
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: "Max",
          email: "max@mail.com",
          cart: {
            items: []
          }
        });
      }
      user.save();
    })
    app.listen(3000);
  })
  .catch( err => {
    console.log(error);
  });