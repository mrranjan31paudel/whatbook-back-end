const router = require('express').Router();

const userController = require('./../controllers/user/users');
const postController = require('./../controllers/user/posts');
const commentController = require('./../controllers/user/comments');
const friendController = require('./../controllers/user/friends');
const notificationController = require('./../controllers/user/notifications');

router.route('/')
  .get(userController.readUserData)
  .put(userController.updateUserData);

router.route('/post')
  .get(postController.readUserPostData)
  .post(postController.writeUserPostData)
  .put(postController.updateUserPostData)
  .delete(postController.deleteUserPostData);

router.route('/comment')
  .get(commentController.readUserCommentData)
  .post(commentController.writeUserCommentData)
  .put(commentController.updateUserCommentData)
  .delete(commentController.deleteUserCommentData);

router.route('/friend')
  .get(friendController.readUserFriendData)
  .post(friendController.writeUserFriendData)
  .put(friendController.updateUserFriendData)
  .delete(friendController.deleteUserFriendData);

////*8**************TO BE SHIFTED TO '/friends' ******/
router.route('/requests')
  .get(friendController.readUserRequestData);

router.route('/people')
  .get(friendController.readUserPeopleData);
////*8**************TO BE SHIFTED TO '/friends' ******/

router.route('/notifications')
  .get(notificationController.readUserNotificationData)
  .put(notificationController.updateUserNotificationData)
  .delete(notificationController.deleteUserNotificationData);

module.exports = router;