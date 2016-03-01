'use strict';
const router = require('express').Router();
module.exports = router;
const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Auth = require('../../../utils/auth.middleware');

router.param('userId', function (req, res, next, userId) {
    var id = userId.toString();
    User.findById(id)
    .populate('cart history')
    .then(function (user) {
        if (!user) throw new Error('User does not exist');
        req.requestedUser = user;
        next();
    })
    .then(null, next);
});

router.use(Auth.ensureAuthenticated);

router.get('/', Auth.ensureAdmin, function (req, res, next) {
    var search = req.query.name ? { fullname: req.query.name } : {}; //in case we want to be able to search the user on the user mgmt page of the admin
    User.find(search)
    .populate('cart history')
    .then(function (allUsers) {
        res.json(allUsers);
    })
    .then(null, next);
});

//get all user info for a particular ID
router.get('/:userId', Auth.ensureAdminOrSelf, function (req, res) {
    //if the user is logged, is either admin or the user it is requesting send back the user info
    res.json(req.requestedUser);
});

router.put('/:userId', Auth.ensureAdminOrSelf, function (req, res, next) {
    if (Auth.isSelf(req)) delete req.body.admin;
    _.extend(req.requestedUser, req.body); //should this be _.assignIn?
    req.requestedUser.save() //because we already pulled this to the server we can just save rather than update
    .then(function (user) {
        res.json(user.sanitize()); //will this have the cart and history populated? Do we need it?
    })
    .then(null, next);
});

router.post('/', Auth.ensureAdmin, function (req, res, next) {
    User.create(req.body)
    .then(function (createdUser) {
        res.status(201).json(createdUser.sanitize());
    })
    .then(null, next);
});