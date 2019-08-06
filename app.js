const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const User = require('./models/user');
const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5d40389a1c9d440000d767fb')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://ysvet:lUyKSmiT4iELOkGR@cluster0-7fmhc.mongodb.net/shop?retryWrites=true&w=majority')
  .then( result => {
    app.listen(3000);
  })
  .catch( err => {
    console.log(error);
  });