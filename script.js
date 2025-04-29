document.addEventListener("DOMContentLoaded", () => {
  let xp = localStorage.getItem("xp") || 0;
  let checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      if (box.checked) {
        let xpGain = parseInt(box.parentElement.textContent.match(/\d+/)[0]);
        xp = parseInt(xp) + xpGain;
        localStorage.setItem("xp", xp);
        alert(`✅ XP Gained! Total XP: ${xp}`);
      }
    });
  });
});
