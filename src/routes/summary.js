const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
	const summary = await pool.query('SELECT * FROM summarySalary');
	res.render('links/summary', {summary: summary[0]});
});

module.exports = router;