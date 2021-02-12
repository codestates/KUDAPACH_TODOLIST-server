/*eslint-disable*/
const express = require('express');
const router = express.Router();

const { controllers } = require('../controllers');

// * OAUTH https://server.kudapach.com/oauth
router.post('/oauth', controllers.oauth.post);

// * POST https://server.kudapach.com/signin
router.post('/signin', controllers.signin.post);

// * POST https://server.kudapach.com/signup
router.post('/signup', controllers.signup.post);

// * POST https://server.kudapach.com/signout
router.post('/signout', controllers.signout.post);

// * GET https://server.kudapach.com/user/info
router.get('/user/info', controllers.user.get);

// * POST https://server.kudapach.com/user/info/edit
router.post('/user/info/edit', controllers.user.edit);

// * POST https://server.kudapach.com/todo
router.get('/todo', controllers.todo.get);

// * POST https://server.kudapach.com/todo/create
router.post('/todo/create', controllers.todo.create);

// * POST https://server.kudapach.com/todo/edit
router.post('/todo/edit', controllers.todo.edit);

// * POST https://server.kudapach.com/todo/calendar
router.post('/todo/calendar', controllers.todo.calendar);

// * GET https://server.kudapach.com/grouptodocard
router.get('/grouptodocard', controllers.grouptodocard.get);

// * POST https://server.kudapach.com/grouptodocard/edit
router.post('/grouptodocard/edit', controllers.grouptodocard.edit);

// * POST https://server.kudapach.com/groupsetting
router.post('/groupsetting/create', controllers.groupsetting.post);

// * POST https://server.kudapach.com/groupsetting/create
router.post('/groupsetting/create', controllers.groupsetting.create);

// * POST https://server.kudapach.com/groupsetting/edit
router.post('/groupsetting/edit', controllers.groupsetting.edit);

module.exports = router;
