const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./util/database');
const app = express();

const Company = require('./models/companies');
const Review = require('./models/reviews')

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', 'views');
//*****
const reviewsRoute = require('./routes/reviews');
app.use(express.json());
app.use(reviewsRoute);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


Review.belongsTo(Company, { foreignKey: 'companyId' })
//it(belong to) automatically adds new users id column to product table)

Company.hasMany(Review,{ foreignKey: 'companyId' })


sequelize
  .sync()
  .then(() => {
    app.listen(7000, () => {
      console.log('Server is running on http://localhost:7000');
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });