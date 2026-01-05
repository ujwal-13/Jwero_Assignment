const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/revenue', analyticsController.getTotalRevenue);
router.get('/category', analyticsController.getCategoryRevenue);
router.get('/top-products', analyticsController.getTopProducts);
router.get('/daily-sales', analyticsController.getDailySales);

module.exports = router;