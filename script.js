function downloadVideo() {
  const link = document.getElementById('tiktok-link').value;
  if (!link) {
    alert("Vui lòng nhập link TikTok!");
    return;
  }
  alert("Đã gửi yêu cầu tải video từ: " + link);
  // Gọi API backend tại đây sau khi có server
}