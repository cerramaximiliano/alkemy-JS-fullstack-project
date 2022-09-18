require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const budgetRoutes = require('./routes/budget');
const userRoutes = require('./routes/users')
const ejs = require('ejs');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => console.log(`Listen on PORT ${process.env.PORT}`));
app.use(userRoutes);
app.use(budgetRoutes);


