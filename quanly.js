document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử DOM
  const toggleAddFormBtn = document.getElementById("toggle-add-form");
  const toggleEditFormBtn = document.getElementById("toggle-edit-form");
  const addTransactionForm = document.getElementById("add-transaction-form");
  const editTransactionForm = document.getElementById("edit-transaction-form");
  const transactionForm = document.getElementById("transaction-form");
  const editTransactionDetailForm = document.getElementById("edit-transaction-detail-form");
  const deleteTransactionBtn = document.getElementById("delete-transaction-btn");
  const transactionCalendar = document.getElementById("transaction-calendar");

  const totalIncomeEl = document.getElementById("total-income");
  const totalExpenseEl = document.getElementById("total-expense");
  const balanceEl = document.getElementById("balance");

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let editIndex = null;

  function formatInputCurrency(inputElement) {
    const value = inputElement.value.replace(/\D/g, "");
    const formattedValue = parseFloat(value).toLocaleString("vi-VN");
    inputElement.value = formattedValue;
  }

  const amountInput = document.getElementById("amount");
  const editAmountInput = document.getElementById("edit-amount");
  if (amountInput) amountInput.addEventListener("input", (e) => formatInputCurrency(e.target));
  if (editAmountInput) editAmountInput.addEventListener("input", (e) => formatInputCurrency(e.target));

  toggleAddFormBtn?.addEventListener("click", () => {
    addTransactionForm.classList.toggle("hidden");
    editTransactionForm.classList.add("hidden");
    transactionForm.reset();
    editIndex = null;
  });

  toggleEditFormBtn?.addEventListener("click", () => {
    editTransactionForm.classList.toggle("hidden");
    addTransactionForm.classList.add("hidden");
    updateEditList();
  });

  function updateEditList() {
    transactionCalendar.innerHTML = "";

    transactions.forEach((transaction, index) => {
      const item = document.createElement("li");
      item.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
      item.innerHTML = `
        <div>
          <p>${transaction.date}</p>
          <p>${transaction.desc} (${transaction.category})</p>
        </div>
        <span>${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}</span>
        <button data-index="${index}" class="edit-btn bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600">Sửa</button>
      `;
      transactionCalendar.appendChild(item);

      const editButton = item.querySelector(".edit-btn");
      editButton.addEventListener("click", () => {
        editTransaction(index);
      });
    });
  }

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }

  function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById("edit-desc").value = transaction.desc;
    document.getElementById("edit-amount").value = transaction.amount.toLocaleString("vi-VN");
    document.getElementById("edit-type").value = transaction.type;
    document.getElementById("edit-category").value = transaction.category;
    document.getElementById("edit-date").value = transaction.date;

    editIndex = index;
    editTransactionForm.classList.remove("hidden");
    addTransactionForm.classList.add("hidden");
  }

  editTransactionDetailForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const desc = document.getElementById("edit-desc").value.trim();
    const amount = parseFloat(document.getElementById("edit-amount").value.replace(/\D/g, ""));
    const type = document.getElementById("edit-type").value;
    const category = document.getElementById("edit-category").value;
    const date = document.getElementById("edit-date").value;

    if (desc && !isNaN(amount) && amount > 0 && type && category && date) {
      transactions[editIndex] = { desc, amount, type, category, date };
      localStorage.setItem("transactions", JSON.stringify(transactions));
      updateSummary();
      updateEditList();
      editTransactionForm.classList.add("hidden");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  });

  deleteTransactionBtn?.addEventListener("click", function () {
    if (confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
      transactions.splice(editIndex, 1);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      updateSummary();
      updateEditList();
      editTransactionForm.classList.add("hidden");
    }
  });

  function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;
    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpenseEl.textContent = formatCurrency(totalExpense);
    balanceEl.textContent = formatCurrency(balance);
  }

  updateSummary();
  updateEditList();
});
