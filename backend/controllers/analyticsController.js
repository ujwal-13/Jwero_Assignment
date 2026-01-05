const pool = require('../database');

exports.getTotalRevenue = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; 
        
        // Logic for "Last Month" (approx 30 days back)
        const lastMonthStart = `DATE_SUB('${startDate}', INTERVAL 1 MONTH)`;
        const lastMonthEnd = `DATE_SUB('${endDate}', INTERVAL 1 MONTH)`;

        const [current] = await pool.query(
            `SELECT SUM(price * quantity) as total FROM orders WHERE order_date BETWEEN ? AND ?`, 
            [startDate, endDate]
        );

        const [previous] = await pool.query(
            `SELECT SUM(price * quantity) as total FROM orders WHERE order_date BETWEEN ${lastMonthStart} AND ${lastMonthEnd}`
        );

        res.json({
            current: parseFloat(current[0].total) || 0,
            previous: parseFloat(previous[0].total) || 0,
            unit: "INR"
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCategoryRevenue = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT category, SUM(price * quantity) as revenue FROM orders GROUP BY category"
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTopProducts = async (req, res) => {
    try {
       
        const startDate = req.query.startDate || '2026-01-01'; 
        const endDate = req.query.endDate || '2026-01-31'
        const [rows] = await pool.query(

            "SELECT product_name, SUM(quantity) as total_qty FROM orders GROUP BY product_name ORDER BY total_qty DESC LIMIT 5"
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getDailySales = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const [rows] = await pool.query(
            "SELECT order_date, SUM(price * quantity) as revenue FROM orders WHERE order_date BETWEEN ? AND ? GROUP BY order_date ORDER BY order_date ASC",
            [startDate, endDate]
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};