const express = require('express');
const router = express.Router();

router.post('/send', (req, res) => {
    res.json({ status: 'OK', message: 'request processed' })
})


module.exports = router;