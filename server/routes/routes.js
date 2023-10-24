const express = require('express');
const multer = require('multer');
const controller = require('../controller/controller.js')

const router = express.Router();
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/addfood', upload.single('photo'), controller.addFood);
router.get('/foodlist', controller.getFoodList);
router.delete('/deletefood/:id', controller.deleteFood);

module.exports = router;
