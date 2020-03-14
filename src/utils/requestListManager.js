function manageRequestList(userId, requestList) {
  let managedRequestList = {
    sentList: [],
    recievedList: []
  };

  requestList.forEach(element => {
    managedRequestList = {
      sentList:
        element.senderid === userId
          ? [
              ...managedRequestList.sentList,
              {
                id: element.id,
                name: element.name
              }
            ]
          : [...managedRequestList.sentList],

      recievedList:
        element.recieverid === userId
          ? [
              ...managedRequestList.recievedList,
              {
                id: element.id,
                name: element.name
              }
            ]
          : [...managedRequestList.recievedList]
    };
  });

  return managedRequestList;
}

module.exports = manageRequestList;
