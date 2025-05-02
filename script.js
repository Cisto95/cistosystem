// ===== Helper: Calculate Level from XP =====
function calculateLevel(xp) {
  return Math.floor(xp / 50) + 1;
}

// ===== Inventory Checker =====
function hasItem(itemName) {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  return inventory.includes(itemName);
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

// ===== Daily Quest Checkbox Setup with Sound & XP + Save State =====
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const savedStates = JSON.parse(localStorage.getItem("checkboxStates") || "{}");

  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedStates[index] || false;

    checkbox.addEventListener("change", () => {
      savedStates[index] = checkbox.checked;
      localStorage.setItem("checkboxStates", JSON.stringify(savedStates));

      if (checkbox.checked) {
        let xp = parseInt(localStorage.getItem("xp")) || 0;
        xp += 5;
        if (hasItem("Sword of Focus")) xp += 2;
        localStorage.setItem("xp", xp);
        updateProfile();

        const audio = new Audio("Ping sound effect.mp3");
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

// ===== Auto Reset Checkboxes & State at Midnight =====
function scheduleAutoReset() {
  const now = new Date();
  const target = new Date();
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 1);
  const timeUntil = target.getTime() - now.getTime();

  setTimeout(() => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);
    localStorage.removeItem("checkboxStates");
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
        // Optional: Add XP bonus logic here
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
