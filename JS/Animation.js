// JavaScript for dynamic image effects
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".hero-img");
  // Reset and trigger zoom-in animation
  img.style.animation = "none";
  void img.offsetWidth; // Trigger reflow
  img.style.animation = "zoomIn 1.2s ease-out, float 4s ease-in-out infinite";

  // Enhance hover effect
  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.1)";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});
