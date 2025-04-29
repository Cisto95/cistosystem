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
function calculateLevel(xp) {
  return Math.floor(xp / 50) + 1; // 50 XP per level
}

function updateProfile() {
  const xp = localStorage.getItem("xp") || 0;
  const level = calculateLevel(xp);
  const levelDisplay = document.getElementById("levelDisplay");
  const xpDisplay = document.getElementById("xpDisplay");

  if (levelDisplay) levelDisplay.textContent = `Level: ${level}`;
  if (xpDisplay) xpDisplay.textContent = `XP: ${xp}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateProfile();
  checkMissedQuests();
});
function checkMissedQuests() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const lastChecked = localStorage.getItem("lastChecked") || "{}";
  const lastData = JSON.parse(lastChecked);
  const today = new Date().toDateString();

  checkboxes.forEach((box, idx) => {
    const key = `quest-${idx}`;
    if (lastData[key] !== today && !box.checked) {
      localStorage.setItem("penaltyTriggered", "true");
    }
    if (box.checked) {
      lastData[key] = today;
    }
  });

  localStorage.setItem("lastChecked", JSON.stringify(lastData));
}
