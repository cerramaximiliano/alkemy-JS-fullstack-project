const path = require('path');

const express = require('express');

const budgetController = require('../controllers/budget');

const router = express.Router();


router.get('/budget', budgetController.getBudget);
router.get('/home/', budgetController.getBudgetLimit);

router.post('/add-item', budgetController.postAddBudget);
router.get('/type/?', budgetController.getBudgetType);

router.post('/delete-item', budgetController.postBudgetDeleteItem);
router.post('/update-item', budgetController.postBudgetUpdateItem);


module.exports = router;


