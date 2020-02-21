function manageRequestList(userId, requestList) {
  let managedRequestList = [];
  console.log('userID: ', userId);
  requestList.forEach(element => {
    managedRequestList = [...managedRequestList,
    {
      user: {
        id: element.id,
        name: element.name
      },
      isSender: element.senderid === userId ? true : false,
      isReciever: element.recieverid === userId ? true : false
    }
    ];
  });

  return managedRequestList;
}

module.exports = manageRequestList;