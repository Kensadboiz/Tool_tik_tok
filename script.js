document.addEventListener("DOMContentLoaded", function () {
  const toggleMenuBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggleMenuBtn && menu) {
    // Toggle menu khi bấm nút
    toggleMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
      menu.classList.toggle("active");
    });

    // Đóng menu khi bấm bên ngoài
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggleMenuBtn.contains(e.target)) {
        menu.classList.remove("active");
      }
    });

    // Đóng menu khi click vào 1 item trong menu
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }
});
