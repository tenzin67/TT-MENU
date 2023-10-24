const FoodModel = require('../models/Foodlist.js');

const addFood = async (req, res) => {
  try {
    const { name, price, des } = req.body;
    const foodlist = await FoodModel.create({
      foodname: name,
      foodprice: price,
      fooddes: des,
      foodphoto: req.file.filename,
    });
    res.json(foodlist);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getFoodList = async (req, res) => {
  try {
    const fooddata = await FoodModel.find({});
    res.json(fooddata);
    console.log(fooddata);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const itemId = req.params.id;
    await FoodModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addFood, getFoodList, deleteFood };
