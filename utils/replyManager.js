function manageNestedReplies(commentList) {

  commentList.forEach(ele => {
    ele.replyList = commentList.filter(element => element.parent_reply_id === ele.id);
  });

  let managedList = commentList.filter(ele => ele.parent_reply_id === null);

  return managedList;
}

module.exports = manageNestedReplies;