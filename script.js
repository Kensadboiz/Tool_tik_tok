function downloadFromTikTok() {
    const url = document.getElementById('videoUrl').value;
    alert("Đang tải video từ Snaptik: " + url);
    // Giả lập gọi API tải video (thực tế sẽ gọi backend xử lý)
}

function uploadLocalVideo() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        alert("Đã tải lên video: " + file.name);
    }
}

function cutVideo() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    if (start && end) {
        const item = document.createElement("li");
        item.textContent = `Đã cắt đoạn từ ${start}s đến ${end}s`;
        document.getElementById("historyList").appendChild(item);
    } else {
        alert("Vui lòng nhập đầy đủ thời gian bắt đầu và kết thúc!");
    }
}
