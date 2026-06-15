export const getTimeDiff = (date) => {
  const diff = Math.abs(new Date(date) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days ? `${days} ימים ` : ""}${hours ? `${hours} שעות ` : ""}${minutes} דקות`;
};