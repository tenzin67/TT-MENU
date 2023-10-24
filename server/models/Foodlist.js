const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    maxlength: 256,
  },
  foodprice: {
    type: Number,
  },
  fooddes: {
    type: String,
  },
  foodphoto: {
    type:String,
  }
});

const FoodModel = mongoose.model('FoodMenu', FoodSchema);

module.exports = FoodModel;
