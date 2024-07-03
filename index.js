const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Expense = require('./models/database.js');
const OneExpense = require('./models/singleexp.js');

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ExpenseDB');
}

app.set("views", path.join(__dirname, 'views')); // set views for ejs
app.set("view engine", "ejs"); // set views engine

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/home', (req, res)=> {
    res.render("index.ejs", {Expense});
});

app.post('/home', (req, res) => {
    res.redirect('/home');
});

app.get('/newexpense', (req, res) => {
    res.render("newexpense.ejs");
});

app.get('/api/expenses', async (req, res) => {
    const expenses = await OneExpense.find();
    res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
    const expense = new OneExpense(req.body); // insertOne data into Database
    const savedExpense = await expense.save();
    res.json(savedExpense);
});

app.delete('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const deletedExpense = await OneExpense.findByIdAndDelete(id);
    if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
});

app.listen(port, (req, res) => {
    console.log(`Server Listening on ${port}`);
});