import dayjs from "dayjs";

export const validateAddReservation = (data) => {
  const { studentId, moduleId, reason, startDate, endDate } = data;

  // Check if all properties are available
  if (!studentId || !moduleId || !reason || !startDate || !endDate) {
    return false;
  }

  // Check if startDate is before endDate and within 6 months
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (
    start.isAfter(end) ||
    end.diff(start, "month") > 6 ||
    end.diff(start, "month") < 1
  ) {
    return false;
  }

  return true;
};

export const validateScoresValue = (data) => {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    if (
      typeof item.scoreValue != "number" ||
      item.scoreValue < 0 ||
      item.scoreValue > 10
    ) {
      return false;
    }
  }

  return true;
};
