document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Toggle menu khi click vào nút hamburger
  menuToggle.addEventListener("click", function(e) {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  // Đóng menu khi nhấn bên ngoài khu vực menu
  document.addEventListener("click", function(e) {
    // Nếu menu đang mở và click không nằm bên trong menu hoặc nút hamburger
    if (menu.classList.contains("show") && !menu.contains(e.target) && e.target !== menuToggle) {
      menu.classList.remove("show");
    }
  });

  // Khi click vào liên kết menu → tự động đóng menu
  const menuLinks = document.querySelectorAll(".menu-list a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function() {
      menu.classList.remove("show");
    });
  });
});
