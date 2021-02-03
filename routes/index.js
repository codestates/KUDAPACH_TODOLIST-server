/*eslint-disable*/
const express = require('express');
const router = express.Router();

const { controllers } = require('../controllers');

// * POST https://www.kudapach.com/signin
router.post('/signin', controllers.signin.post);

// * POST https://www.kudapach.com/signup
router.post('/signin', controllers.signup.post);

// * GET https://www.kudapach.com/userinfo
router.post('/signin', controllers.user.post);

// * GET https://www.kudapach.com/user/info
router.post('/signin', controllers.user.post);

// * POST https://www.kudapach.com/user/info/edit
router.post('/signin', controllers.user.info.post);

// * GET https://www.kudapach.com/todo
router.post('/signin', controllers.todo.post);

// * POST https://www.kudapach.com/todo/edit
router.post('/signin', controllers.todo.post);

// * POST https://www.kudapach.com/todo/calendar
router.post('/signin', controllers.todo.post);

// * POST https://www.kudapach.com/group
router.post('/signin', controllers.group.post);

// * POST https://www.kudapach.com/group/?groupid
router.post('/signin', controllers.group.post);

module.exports = router;
