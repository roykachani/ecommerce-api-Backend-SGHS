const { Router } = require('express');
const router = Router();
const { contactEmail } = require('../controllers/contact');

router.post('/', contactEmail);

module.exports = router;
