const db = require('../config/database');

module.exports = class Budget {
  constructor(id, description, amount, type, date) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.category = category;
  }
  save() {
    return db.execute(
      'INSERT INTO budget (description, amount, type, date, category) VALUES (?, ?, ?, ?, ?)',
      [this.description, this.amount, this.type, this.date, this.category]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM budget ORDER BY date ASC');
  }
  
  static findByType(type) {
    return db.execute('SELECT * FROM budget WHERE budget.type = ?', [type]);
  }

  static deleteItem(id) {
    return db.execute('DELETE FROM budget WHERE budget.id = ?', [id]);
  }

  static updateItem(id, amount, date, description){
    return db.execute('UPDATE budget SET amount = COALESCE(?, amount), date = COALESCE(?, date), description = COALESCE(?, description) WHERE id= ?', [amount, date, description, id])
  }

};


