export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Jó reggelt! 👋";
  }

  if (hour < 18) {
    return "Jó napot! 👋";
  }

  return "Jó estét! 👋";
}