const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (get, res) => {
	const auditories = await pool.query('SELECT * FROM auditoria');
	// res.send('auditorias');
	res.render('links/auditory', {auditories});
})

module.exports = router;