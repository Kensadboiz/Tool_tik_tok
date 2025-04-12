document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const list = document.getElementById('expense-list');
    const total = document.getElementById('total-expense');

    const li = document.createElement('li');
    li.textContent = `${name}: ${amount} VND`;
    list.appendChild(li);

    const currentTotal = parseFloat(total.textContent);
    total.textContent = (currentTotal + amount).toFixed(2);

    document.getElementById('expense-form').reset();
});
// Khi tải trang, khôi phục dữ liệu từ localStorage
document.addEventListener('DOMContentLoaded', function () {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const list = document.getElementById('expense-list');
    const total = document.getElementById('total-expense');
    let totalAmount = 0;

    savedExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: ${expense.amount} VND`;
        list.appendChild(li);
        totalAmount += expense.amount;
    });

    total.textContent = totalAmount.toFixed(2);
});

// Xử lý thêm dữ liệu và lưu vào localStorage
document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    const list = document.getElementById('expense-list');
    const total = document.getElementById('total-expense');

    const li = document.createElement('li');
    li.textContent = `${name}: ${amount} VND`;
    list.appendChild(li);

    // Tính tổng và hiển thị
    const currentTotal = parseFloat(total.textContent);
    total.textContent = (currentTotal + amount).toFixed(2);

    // Lưu vào localStorage
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    savedExpenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(savedExpenses));

    // Reset form
    document.getElementById('expense-form').reset();
});
