const express = require('express');
const burgerController = require('../controllers/burgerController');

const router = express.Router();

router.get('/create', burgerController.burger_create_get);
router.get('/', burgerController.burger_main);
router.post('/', burgerController.burger_create_post);
router.get('/:id', burgerController.burger_details);
router.put('/:id', burgerController.burger_update_put);
router.delete('/:id', burgerController.burger_delete);

module.exports = router;