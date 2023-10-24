const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/uploads'));

mongoose.connect('mongodb+srv://admin:admin123@cluster0.m9bbuw5.mongodb.net/foodmenu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', routes);

const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
