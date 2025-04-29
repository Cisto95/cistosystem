document.addEventListener("DOMContentLoaded", () => {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      if (box.checked) {
        alert("✅ XP Gained!");
      }
    });
  });
});
