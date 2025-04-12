const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const incomeEl = document.getElementById("total-income");
const expenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.textContent = `${t.desc}: ${t.amount} đ`;
    li.onclick = () => {
      if (confirm("Xóa giao dịch này?")) {
        transactions.splice(i, 1);
        saveAndRender();
      }
    };
    list.appendChild(li);

    if (t.type === "income") income += +t.amount;
    else expense += +t.amount;
  });

  incomeEl.textContent = income.toLocaleString();
  expenseEl.textContent = expense.toLocaleString();
  balanceEl.textContent = (income - expense).toLocaleString();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

form.onsubmit = e => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  transactions.push({ desc, amount, type });
  form.reset();
  saveAndRender();
};

updateUI();
