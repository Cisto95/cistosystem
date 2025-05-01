// ===== Helper: Calculate Level from XP =====
function calculateLevel(xp) {
  return Math.floor(xp / 50) + 1;
}

// ===== XP and Level Display Update =====
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

// ===== Daily Quest Checkbox Setup with Sound =====
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        const audio = new Audio("Ping sound effect.mp3"); // Replace with correct file name
        audio.play().catch(() => {});
      }
    });
  });
}

// ===== Penalty Trigger at 23:59 if Tasks Unchecked =====
function schedulePenaltyCheck() {
  const now = new Date();
  const target = new Date();
  target.setHours(23, 59, 0, 0);
  const timeUntil = target.getTime() - now.getTime();
  if (timeUntil < 0) return;

  setTimeout(() => {
    const checkboxes = document.querySelectorAll(".mission-list input[type='checkbox']");
    const anyUnchecked = Array.from(checkboxes).some(cb => !cb.checked);
    if (anyUnchecked) {
      const penaltyAudio = new Audio("penalty.mp3");
      penaltyAudio.play().catch(() => {});
      alert("⚠️ Penalty triggered for missed daily tasks!");
    }
  }, timeUntil);
}

// ===== Auto Reset Checkboxes at Midnight =====
function scheduleAutoReset() {
  const now = new Date();
  const target = new Date();
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 1);
  const timeUntil = target.getTime() - now.getTime();

  setTimeout(() => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);
  }, timeUntil);
}

// ===== Random Dungeon Pop-up with Buttons =====
function spawnDungeonEvent() {
  const delay = Math.random() * 600000 + 60000; // 1–11 mins
  setTimeout(() => {
    const popup = document.getElementById("dungeonPopup");
    if (!popup) return;
    popup.classList.remove("hidden");

    const dungeonAudio = new Audio("dungeon.mp3");
    dungeonAudio.play().catch(() => {});

    const faceBtn = document.getElementById("faceItBtn");
    const ignoreBtn = document.getElementById("ignoreBtn");

    if (faceBtn) {
      faceBtn.onclick = () => {
        popup.classList.add("hidden");
        alert("⚔️ You faced the dungeon! XP reward coming soon...");
        // Optional: Add XP bonus logic
      };
    }

    if (ignoreBtn) {
      ignoreBtn.onclick = () => {
        popup.classList.add("hidden");
        alert("🚪 You ignored the dungeon.");
      };
    }
  }, delay);
}

// ===== Init on Load =====
document.addEventListener("DOMContentLoaded", () => {
  setupCheckboxes();
  updateProfile();
  schedulePenaltyCheck();
  scheduleAutoReset();
  spawnDungeonEvent();
});
