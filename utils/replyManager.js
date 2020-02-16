function manageNestedReplies(commentList, managedList) {
  commentList.forEach(ele => {
    ele.replyList = [];
    if (ele.parent_reply_id === null) {
      managedList.push(ele);
    }
    commentList.forEach(element => {
      if (element.parent_reply_id === ele.id) {
        ele.replyList.push(element);
      }
    });
  });
}

module.exports = manageNestedReplies;