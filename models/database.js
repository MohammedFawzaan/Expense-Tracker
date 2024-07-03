const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Schema1 = new Schema(
    {
        Day : {type: Number, required: true},
        TotalAmount : {type: Number, required: true},
        Date: {type: Date, required: true},
        Description: {type: String, required: false}
    }
);

const Expense = mongoose.model('Expense', Schema1);

module.exports = Expense;