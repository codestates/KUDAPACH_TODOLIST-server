/*eslint-disable*/
const express = require('express');
const router = express.Router();

const { controllers } = require('../controllers');

// * OAUTH https://server.kudapach.com/oauth
router.post('/oauth/google', controllers.oauth.post);

// * POST https://server.kudapach.com/signin
router.post('/signin', controllers.signin.post);

// * POST https://server.kudapach.com/signup
router.post('/signup', controllers.signup.post);

// * POST https://server.kudapach.com/signout
router.post('/signout', controllers.signout);

// * GET https://server.kudapach.com/user/info
router.get('/user/info', controllers.user.get);

// * POST https://server.kudapach.com/user/info/edit
router.post('/user/info/edit', controllers.user.edit);

// * POST https://server.kudapach.com/todo
router.post('/todo', controllers.todo.get);

// * POST https://server.kudapach.com/todo/edit
router.post('/todo/edit', controllers.todo.edit);

// * POST https://server.kudapach.com/todo/calendar
router.post('/todo/calendar', controllers.todo.calendar);

// * GET https://server.kudapach.com/group
router.get('/group', controllers.group.get);

// * POST https://server.kudapach.com/setting/group/edit
router.post('/setting/group/edit', controllers.setting.post);

// * POST https://server.kudapach.com/group/todo/edit
router.post('/group/todo/edit', controllers.group.edit);

module.exports = router;
