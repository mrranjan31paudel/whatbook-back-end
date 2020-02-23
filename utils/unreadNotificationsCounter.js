function coutUnreadNotifications(notificationList) {
  let count = 0;

  notificationList.forEach(element => {
    if (element.status === 0) {
      count++;
    }
  });

  return count;
}

module.exports = coutUnreadNotifications;