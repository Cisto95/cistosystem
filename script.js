// ✅ Play ping when checkbox is checked
document.querySelectorAll('input[type="checkbox"]').forEach(box => {
  box.addEventListener('change', () => {
    if (box.checked) {
      new Audio('ping.mp3').play();
    }
  });
});

// ✅ Check for penalties at 23:59
function checkPenalties() {
  const tasks = document.querySelectorAll('input[type="checkbox"]');
  const incomplete = [...tasks].some(task => !task.checked);
  if (incomplete) {
    new Audio('penalty.mp3').play();
    alert("⚠️ Penalty triggered! You left tasks unfinished.");
  }
}

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 23 && now.getMinutes() === 59 && now.getSeconds() === 0) {
    checkPenalties();
  }
}, 1000);

// ✅ Auto-reset checkboxes at midnight (00:00)
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  }
}, 1000);

// ✅ Random dungeon popup (20% chance per hour)
function maybeShowDungeon() {
  const chance = Math.random();
  if (chance < 0.2) {
    alert("💥 A hidden dungeon has appeared! Face it or ignore?");
    // Future: trigger mini-game or bonus XP
  }
}

// Check once at start and then every hour
maybeShowDungeon();
setInterval(maybeShowDungeon, 3600000); // every 60 minutes
