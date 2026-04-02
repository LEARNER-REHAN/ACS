const getStreak = () => {
  const today = new Date().toDateString(); // ✅ FIX
  const lastCheckIn = localStorage.getItem("lastCheckIn");

  let streak = Number(localStorage.getItem("streak")) || 0;

  if (!lastCheckIn) {
    localStorage.setItem("streak", 1);
    localStorage.setItem("lastCheckIn", today);
    return 1;
  }

  const lastDate = new Date(lastCheckIn);
  const currentDate = new Date(today);

  const diffTime = currentDate - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return streak; // already checked today
  }

  if (diffDays === 1) {
    streak += 1; // next day → increase
  } else {
    streak = 1; // missed → reset
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastCheckIn", today);

  return streak;
};

export default getStreak;
