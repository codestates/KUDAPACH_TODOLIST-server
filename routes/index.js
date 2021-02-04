/*eslint-disable*/
const express = require('express');
const router = express.Router();

const { controllers } = require('../controllers');

// * POST https://www.kudapach.com/signin
router.post('/signin', controllers.signin.post);

// * POST https://www.kudapach.com/signup
router.post('/signup', controllers.signup.post);

// * GET https://www.kudapach.com/user/info
router.get('/user/info', controllers.user.get);

// * POST https://www.kudapach.com/user/info/edit
router.post('/user/info/edit', controllers.user.edit);

// * GET https://www.kudapach.com/todo
router.get('/todo', controllers.todo.get);

// * POST https://www.kudapach.com/todo/edit
router.post('/todo/edit', controllers.todo.edit);

// * POST https://www.kudapach.com/todo/calendar
router.post('/todo/calendar', controllers.todo.calendar);

// * GET https://www.kudapach.com/group
router.get('/group', controllers.group.get);

// * POST https://www.kudapach.com/setting/group/edit
router.post('/group/:groupid', controllers.setting.post);

module.exports = router;
