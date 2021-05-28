const { Router } = require('express');

const { create, auth, updateStatus } = require('./../controllers/auth');

const router = Router();

router.post('/', create);
router.post('/login', auth);
router.get('/verificationCode/:verificationCode', updateStatus);

module.exports = router;
