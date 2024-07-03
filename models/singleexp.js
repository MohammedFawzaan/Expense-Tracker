const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Schema2 = new Schema({
    category: {type: String, required: true},
    amount : {type: Number, required: true}
});

const OneExpense = mongoose.model('OneExpense', Schema2);

module.exports = OneExpense;