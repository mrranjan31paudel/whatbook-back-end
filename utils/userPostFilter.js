function filterUserPosts(ownerId, postList) {
  let filteredList = postList.filter(element => element.userid === ownerId);
  filteredList.forEach(element => {
    element.date = `${element.date_time}`.split(' ', 4).join(' ');
    element.time = `${element.date_time}`.split(' ')[4];
  });

  return filteredList;
}

module.exports = filterUserPosts;