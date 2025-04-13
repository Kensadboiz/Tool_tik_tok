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
let editIndex = null; // Biến xác định giao dịch đang chỉnh sửa

// Hàm định dạng tiền và thêm dấu chấm khi nhập
function formatInputCurrency(inputElement) {
  const value = inputElement.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
  const formattedValue = parseFloat(value).toLocaleString("vi-VN"); // Định dạng tiền VND
  inputElement.value = formattedValue;
}

// Sự kiện để tự động thêm dấu chấm khi nhập tiền
document.getElementById("amount").addEventListener("input", (e) => formatInputCurrency(e.target));
document.getElementById("edit-amount").addEventListener("input", (e) => formatInputCurrency(e.target));

// Hiển thị/ẩn form thêm giao dịch
toggleAddFormBtn.addEventListener("click", () => {
  addTransactionForm.classList.toggle("hidden");
  editTransactionForm.classList.add("hidden");
  transactionForm.reset();
  editIndex = null; // Xóa trạng thái chỉnh sửa
});

// Hiển thị/ẩn form chỉnh sửa giao dịch
toggleEditFormBtn.addEventListener("click", () => {
  editTransactionForm.classList.toggle("hidden");
  addTransactionForm.classList.add("hidden");
  updateEditList(); // Hiển thị danh sách giao dịch để sửa/xóa
});

// Cập nhật danh sách giao dịch trong form chỉnh sửa/xóa
function updateEditList() {
  transactionCalendar.innerHTML = ""; // Xóa danh sách cũ

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

    // Sự kiện nút "Sửa"
    const editButton = item.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      editTransaction(index); // Chuyển sang form chỉnh sửa
    });
  });
}

// Hàm định dạng tiền (hiển thị số tiền với dấu chấm)
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Cập nhật thông tin giao dịch lên form chỉnh sửa chi tiết
function editTransaction(index) {
  const transaction = transactions[index];
  document.getElementById("edit-desc").value = transaction.desc;
  document.getElementById("edit-amount").value = transaction.amount.toLocaleString("vi-VN"); // Định dạng hiển thị tiền
  document.getElementById("edit-type").value = transaction.type;
  document.getElementById("edit-category").value = transaction.category;
  document.getElementById("edit-date").value = transaction.date;

  editIndex = index; // Đặt trạng thái chỉnh sửa
  editTransactionForm.classList.remove("hidden"); // Hiển thị form chỉnh sửa chi tiết
  addTransactionForm.classList.add("hidden"); // Ẩn form thêm giao dịch
}

// Xử lý khi nhấn nút "Cập Nhật" trong form chỉnh sửa
editTransactionDetailForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const desc = document.getElementById("edit-desc").value.trim();
  const amount = parseFloat(document.getElementById("edit-amount").value.replace(/\D/g, ""));
  const type = document.getElementById("edit-type").value;
  const category = document.getElementById("edit-category").value;
  const date = document.getElementById("edit-date").value;

  if (desc && !isNaN(amount) && amount > 0 && type && category && date) {
    transactions[editIndex] = { desc, amount, type, category, date }; // Cập nhật giao dịch
    localStorage.setItem("transactions", JSON.stringify(transactions)); // Lưu vào localStorage
    updateSummary(); // Cập nhật hiển thị tổng
    updateEditList(); // Cập nhật danh sách
    editTransactionForm.classList.add("hidden"); // Ẩn form chỉnh sửa
  } else {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
});

// Xử lý khi nhấn nút "Xóa" trong form chỉnh sửa
deleteTransactionBtn.addEventListener("click", function () {
  if (confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
    transactions.splice(editIndex, 1); // Xóa giao dịch khỏi danh sách
    localStorage.setItem("transactions", JSON.stringify(transactions)); // Lưu lại danh sách mới
    updateSummary(); // Cập nhật hiển thị tổng
    updateEditList(); // Cập nhật danh sách
    editTransactionForm.classList.add("hidden"); // Ẩn form chỉnh sửa
  }
});

// Cập nhật tổng thu nhập, chi tiêu và số dư
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

  const balance = totalIncome - totalExpense; // Tính số dư
  totalIncomeEl.textContent = formatCurrency(totalIncome);
  totalExpenseEl.textContent = formatCurrency(totalExpense);
  balanceEl.textContent = formatCurrency(balance);
}

// Tải dữ liệu ban đầu
updateSummary();
updateEditList();
