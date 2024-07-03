// Frontend JavaScript
let categoryinp = document.querySelector('#category');
let amountinp = document.querySelector('#amount');
let btn = document.querySelector('.btn');
let ul = document.querySelector('ul');

btn.addEventListener('click', () => {
    if (categoryinp.value !== "" && amountinp.value !== "") {
        let expense = {
            category: categoryinp.value,
            amount: parseInt(amountinp.value)
        };

        fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        })
        .then(response => { { return response.json()} })
        .then(data => {
            console.log('Data Saved:', data);
            addExpenseToList(data); // Add expense to the DOM
            categoryinp.value = "";
            amountinp.value = "";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function addExpenseToList(expense) {
    let li = document.createElement('li');
    li.innerText = `${expense.category}: ${expense.amount}`;
    li.setAttribute('data-id', expense._id);

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        deleteExpense(expense._id, li);
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/expenses')
    .then(response => { return response.json()})
    .then(data => {
        data.forEach(expense => addExpenseToList(expense));
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function deleteExpense(id, listItem) {
    fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            listItem.remove();
        } else {
            console.error('Failed to delete expense');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};