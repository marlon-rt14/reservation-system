const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
	const summary = await pool.query('SELECT * FROM mysql.general_log');
	res.render('links/logger', {summary});
});

module.exports = router;