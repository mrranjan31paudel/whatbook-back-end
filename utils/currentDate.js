function getCurrentDate() {
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:00`;
}

module.exports = { getCurrentDate };