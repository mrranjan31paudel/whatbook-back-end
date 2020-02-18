function filterUserPosts(ownerId, postList) {
  let filteredList = postList.filter(element => element.userid === ownerId);

  return filteredList;
}

module.exports = filterUserPosts;