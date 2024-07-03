const mongoose = require('mongoose');
const Expense = require('./models/database.js');
const OneExpense = require('./models/singleexp.js');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ExpenseDB');
}

Expense.insertMany(
    {
        Day: 0,
        TotalAmount: 10,
        Date: new Date(),
        Description: "Today"
    }
).then((res) => {
    console.log("Data saved");
}).catch((e) => {
    console.log(e);
});

OneExpense.insertMany(
    {category : "lays", amount: 10},
    {category: "Chips", amount: 12}
).then((res) => {
    console.log("Data saved");
}).catch((e) => {
    console.log(e);
});