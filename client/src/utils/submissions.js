export const statusLabel = {
  unsubmitted: "לא הוגש",
  submitted: "הוגש",
  checked: "נבדק",
  late: "באיחור"
};

export const isLate = (closeDate) => {
  return new Date() > new Date(closeDate);
};