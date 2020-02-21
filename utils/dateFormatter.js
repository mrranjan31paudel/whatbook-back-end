function formatDateTime(contentList) {
  contentList.forEach(element => {
    element.date = `${element.date_time}`.split(' ', 4).join(' ');
    element.time = `${element.date_time}`.split(' ')[4];
  });
}

module.exports = formatDateTime;