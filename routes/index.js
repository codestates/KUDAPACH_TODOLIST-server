/*eslint-disable*/
const express = require('express');
const router = express.Router();

const { controllers } = require('../controllers');

// * POST https://www.kudapach.com/signin
router.post('/signin', controllers.signin.post);

// * POST https://www.kudapach.com/signup
router.post('/signup', controllers.signup.post);

// * GET https://www.kudapach.com/user/info
router.get('/user/info', controllers.user.post);

// * POST https://www.kudapach.com/user/info/edit
router.post('/user/info/edit', controllers.user.edit);

// * GET https://www.kudapach.com/todo
router.get('/todo', controllers.todo.post);

// * POST https://www.kudapach.com/todo/edit
router.post('/todo/edit', controllers.todo.edit);

// * POST https://www.kudapach.com/todo/calendar
router.post('/todo/calendar', controllers.todo.calendar);

// * POST https://www.kudapach.com/group
router.post('/group', controllers.group.post);

// * POST https://www.kudapach.com/group/:groupid
router.post('/group/:groupid', controllers.group.redirect);

module.exports = router;
