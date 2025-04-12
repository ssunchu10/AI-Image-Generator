const express = require('express');
const { searchImages } = require('../controllers/openaiController');
const router = express.Router();

router.post("/generateimage", searchImages);

module.exports = router;