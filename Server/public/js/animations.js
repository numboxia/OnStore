document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mouseover", () => {
      btn.style.boxShadow = "0 0 15px rgba(56, 189, 248, 0.7)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.boxShadow = "none";
    });
  });
});
