const express = require('express');
const router = new express.Router();

router.get('/test', ( req, resp) => {
    resp.send('From the new file');
})

module.exports = router;