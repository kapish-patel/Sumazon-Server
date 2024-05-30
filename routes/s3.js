const { Router } = require('express');
const router = Router();
const { generateUploadURL } = require('../aws-config.js');

router.get('/', async (req, res, next) => {
    const url = await generateUploadURL()
    res.send({url})
})

module.exports = router