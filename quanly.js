// Lấy các thành phần DOM
const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");

// Dữ liệu giao dịch (lưu trữ trong bộ nhớ đệm nếu có)
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Hàm cập nhật giao diện
function updateUI() {
    transactionList.innerHTML = ""; // Xóa danh sách cũ
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.className = `p-4 mb-2 rounded-lg flex justify-between items-center ${
            transaction.type === "income" ? "bg-green-100" : "bg-red-100"
        }`;

        listItem.innerHTML = `
            <div>
                <p class="font-bold">${transaction.desc}</p>
                <p class="text-sm text-gray-500">${
                    transaction.type === "income" ? "Thu Nhập" : "Chi Tiêu"
                }</p>
            </div>
            <div>
                <p class="text-blue-600 font-bold">${formatCurrency(transaction.amount)}</p>
                <button class="text-red-500 font-bold" onclick="deleteTransaction(${index})">Xóa</button>
            </div>
        `;
        transactionList.appendChild(listItem);

        // Tính toán tổng thu nhập và chi tiêu
        if (transaction.type === "income") {
            totalIncome += parseFloat(transaction.amount);
        } else {
            totalExpense += parseFloat(transaction.amount);
        }
    });

    // Cập nhật số tổng
    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpenseEl.textContent = formatCurrency(totalExpense);
    balanceEl.textContent = formatCurrency(totalIncome - totalExpense);
}

// Hàm định dạng số tiền
function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Hàm xóa giao dịch
function deleteTransaction(index) {
    transactions.splice(index, 1); // Xóa giao dịch theo chỉ số
    saveAndRender();
}

// Hàm lưu dữ liệu vào localStorage và cập nhật giao diện
function saveAndRender() {
    localStorage.setItem("transactions", JSON.stringify(transactions)); // Lưu dữ liệu vào localStorage
    updateUI();
}

// Xử lý sự kiện thêm giao dịch mới
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn tải lại trang

    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    // Kiểm tra đầu vào hợp lệ
    if (desc && amount && type) {
        transactions.push({ desc, amount, type }); // Thêm giao dịch mới vào danh sách
        form.reset(); // Đặt lại form
        saveAndRender(); // Cập nhật giao diện
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
});

// Khởi tạo giao diện khi tải trang
updateUI();
