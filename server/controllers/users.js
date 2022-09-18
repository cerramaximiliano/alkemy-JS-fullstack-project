const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User(null, email, password);
    newUser
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

}

exports.getUsers = (req, res, next) => {
    User.fetchAll()
      .then(([rows, fieldData]) => {
        res.status(200).json({
            users: rows,
            ok: true,
            status: 200
        });
      })
      .catch(err => {
        res.status(500).json({
            status: 500,
            ok: false,
            err: err
          })
      });
  };

  exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.loging(email)
        .then(([rows]) => {
            if(rows[0] === undefined){
                res.status(403).json({
                    ok: false,
                    err: 'Error, email or password not found'
                })
            }else{
                const equals = bcrypt.compareSync(password, rows[0].password);
                if(!equals){
                    res.status(403).json({
                        ok: false,
                        err: 'Error, email or password not found'
                    })
                }else{
                    res.status(200).json({
                        ok: true,
                        message: 'Login correct'
                    })
                }
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                ok: false,
                err: err
              })
        })
  };

  exports.logout = (req, res, next) => {
    return res.redirect('/');
  };