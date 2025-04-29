// ========== XP & Level Calculation ==========
function calculateLevel(xp) {
  return Math.floor(xp / 50) + 1;
}

function updateProfile() {
  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const level = calculateLevel(xp);

  const xpDisplay = document.getElementById("xpDisplay");
  const levelDisplay = document.getElementById("levelDisplay");
  const levelUpMessage = document.getElementById("levelUpMessage");

  if (xpDisplay) xpDisplay.textContent = `XP: ${xp}`;
  if (levelDisplay) levelDisplay.textContent = `Level: ${level}`;

  const lastLevel = parseInt(localStorage.getItem("lastLevel")) || 0;
  if (level > lastLevel && levelUpMessage) {
    levelUpMessage.style.display = "block";
    localStorage.setItem("lastLevel", level);
  }
}

// ========== Checkboxes for Daily & Missions ==========
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  let xp = parseInt(localStorage.getItem("xp")) || 0;

  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      if (box.checked) {
        let match = box.parentElement.textContent.match(/\d+/);
        if (match) {
          const xpGain = parseInt(match[0]);
          xp += xpGain;
          localStorage.setItem("xp", xp);
          alert(`✅ XP Gained! Total XP: ${xp}`);
          updateProfile();
        }
      }
    });
  });
}

// ========== Penalty System ==========
function checkMissedQuests() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const lastChecked = JSON.parse(localStorage.getItem("lastChecked") || "{}");
  const today = new Date().toDateString();

  checkboxes.forEach((box, idx) => {
    const key = `quest-${idx}`;
    if (lastChecked[key] !== today && !box.checked) {
      localStorage.setItem("penaltyTriggered", "true");
    }
    if (box.checked) {
      lastChecked[key] = today;
    }
  });

  localStorage.setItem("lastChecked", JSON.stringify(lastChecked));
}

// ========== Run on Every Page ==========
document.addEventListener("DOMContentLoaded", () => {
  updateProfile();
  setupCheckboxes();
  checkMissedQuests();
});
