const router = require('express').Router();

const userController = require('./../controllers/user');

router.route('/')
  .get(userController.readUserData)
  .put(userController.updateUserData);

router.route('/post')
  .get(userController.readUserPostData)
  .post(userController.writeUserPostData)
  .put(userController.updateUserPostData)
  .delete(userController.deleteUserPostData);

router.route('/comment')
  .get(userController.readUserCommentData)
  .post(userController.writeUserCommentData)
  .put(userController.updateUserCommentData)
  .delete(userController.deleteUserCommentData);

router.route('/friend')
  .get(userController.readUserFriendData)
  .post(userController.writeUserFriendData)
  .put(userController.updateUserFriendData)
  .delete(userController.deleteUserFriendData);

////*8**************TO BE SHIFTED TO '/friends' ******/
router.route('/requests')
  .get(userController.readUserRequestData);

router.route('/people')
  .get(userController.readUserPeopleData);
////*8**************TO BE SHIFTED TO '/friends' ******/

router.route('/notifications')
  .get(userController.readUserNotificationData)
  .put(userController.updateUserNotificationData)
  .post(userController.deleteUserNotificationData);

module.exports = router;