const Budget = require('../models/budget');
const path = require('path');

exports.getBudget = (req, res, next) => {
    Budget.fetchAll()
      .then(([rows, fieldData]) => {
        let balance = 0;
        rows.forEach(function(ele) {
          if(ele.type === 'egreso'){
            balance -= ele.amount
          }else{
            balance += ele.amount
          }
        });
        res.render(path.join(__dirname, '../views/') + 'home.ejs', {
          budget: rows,
          number: rows.length,
          balance: balance
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          ok: false,
          err: err
        })
      });
  };

  exports.getBudgetLimit = (req, res, next) => {
    Budget.fetchAll()
    .then(([rows]) => {
      let balance = 0;
      rows.forEach(function(ele) {
        if(ele.type === 'egreso'){
          balance -= ele.amount
        }else{
          balance += ele.amount
        }
      });
      res.render(path.join(__dirname, '../views/') + 'home.ejs', {
        budget: rows,
        number: 9,
        balance: balance
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        ok: false,
        err: err
      })
    })
  };

  exports.getBudgetType = (req, res, next) => {
    const budgetType = req.query.type;
    const balance = req.query.balance;
    Budget.findByType(budgetType)
      .then(([rows]) => {
        res.render(path.join(__dirname, '../views/') + 'home.ejs', {
          budget: rows,
          balance: balance,
          number: rows.length,
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          ok: false,
          err: err
        })
      });
  };

  exports.postAddBudget = (req, res, next) => {
    const description = req.body.description;
    const amount = req.body.amount;
    const type = req.body.selectedOperation;
    const date = req.body.date;
    const budget = new Budget(null, description, amount, type, date);
    budget
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          ok: false,
          err: err
        })
      });
  };

  exports.postBudgetDeleteItem = (req, res, next) => {
    const id = req.body.id;
    Budget.deleteItem(id)
    .then(result => {
      res.status(200).json({
        ok: true,
        status: 200
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        ok: false,
        err: err
      })
    })
  };

  exports.postBudgetUpdateItem = (req, res, next) => {
    const id = req.body.id;
    const description = req.body.description || null;
    const amount = req.body.amount || null;
    const date = req.body.date || null;
    Budget.updateItem(id, amount, date, description)
    .then(result => {
      res.status(200).json({
        ok: true,
        status: 200
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        ok: false,
        err: err
      })
    })
  };