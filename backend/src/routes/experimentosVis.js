const { Router } = require('express');
const router = Router();

const { getVisExp } = require('../controllers/experimentosVis.controller');

router.route('/:idExp/:idFase')
    .get(getVisExp);

module.exports = router;