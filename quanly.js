// Lấy các phần tử DOM
const mainContainer = document.getElementById("main-container");
const formContainer = document.getElementById("form-container");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");
const transactionCalendar = document.getElementById("transaction-calendar");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Hiển thị form thêm giao dịch
openFormBtn.addEventListener("click", () => {
    mainContainer.classList.add("hidden");
    formContainer.classList.remove("hidden");
});

// Đóng form và quay lại giao diện chính
closeFormBtn.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
});

// Lưu giao dịch
document.getElementById("transaction-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    if (desc && amount && type) {
        const date = new Date().toLocaleDateString();
        transactions.push({ desc, amount, type, date });
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateCalendar();
        document.getElementById("transaction-form").reset();
        closeFormBtn.click();
    }
});

// Cập nhật lịch giao dịch
function updateCalendar() {
    transactionCalendar.innerHTML = "";
    transactions.forEach((transaction) => {
        const item = document.createElement("li");
        item.className = "flex justify-between p-2 border-b";
        item.innerHTML = `
            <span class="font-bold">Ngày ${transaction.date}:</span>
            <span>${transaction.type === "income" ? "Thu Nhập" : "Chi Tiêu"} - ${parseFloat(transaction.amount).toLocaleString("vi-VN")} đ</span>
        `;
        transactionCalendar.appendChild(item);
    });
}

// Khởi tạo lịch giao dịch khi tải trang
updateCalendar();
