export const utilsService = {
  compareValues,
  getMonthsDiffBetweenDates,
};

function compareValues(key, direction = "up") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return direction === "down" ? comparison * -1 : comparison;
  };
}

//dates inputs as Date objects
function getMonthsDiffBetweenDates(date1, date2) {
  let yearsDiff = getYearsDiffBetweenDates(date1, date2);
  let monthsDiff = yearsDiff * 12 + (date2.getMonth() - date1.getMonth());
  return monthsDiff;
}

//dates inputs as Date objects
function getYearsDiffBetweenDates(date1, date2) {
  return date2.getFullYear() - date1.getFullYear();
}
