const Users = require('../model/users');
const bcrypt = require('bcrypt');

exports.userRegistration = (req, res, next) => {
    res.render('registration', {
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.submitData = (req, res, next) => {
    req.session.isLoggedIn = true;
    var name = req.body.name;
    var contactNumber = req.body.contactNumber;
    var email = req.body.email;
    var password = req.body.password;
    req.session.userName = name;
    return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            const users = new Users({
                name: name,
                contactNumber: contactNumber,
                emailId: email,
                password: hashedPassword,
                isAuthenticated: req.session.isLoggedIn
            })
            users.save()
                .then(res.redirect('/getData'))
        })
}

exports.viewSingleData = (req, res, next) => {
    var id = req.body.view;
    Users.findById(id)
        .then(result => {
            res.render('singleUser', {
                data: result,
                isAuthenticated: req.session.isLoggedIn
            })
        })
}

exports.updateCustomerData = (req, res, next) => {
    var id = req.body.update;
    Users.findById(id)
        .then(result => {
            res.render('updateForm', {
                data: result,
                isAuthenticated: req.session.isLoggedIn
            })
        })
}

exports.updated = (req, res, next) => {
    var id = req.body.id
    var name = req.body.name;
    var contactNumber = req.body.contactNumber;
    var email = req.body.email;
    Users.findByIdAndUpdate(id, {
        name: name,
        contactNumber: contactNumber,
        emailId: email,
        isAuthenticated: req.session.isLoggedIn
    })
        .then(res.redirect('/getData'))
}

exports.deleteCustomerData = (req, res, next) => {
    var id = req.params.user;
    Users.findByIdAndDelete(id)
        .then(res.status(202).json({ message: 'succeeded' }))
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/home');
    })
}

exports.getData = (req, res, next) => {
    Users.find()
        .then(result => {
            res.render('usersTable', {
                data: result,
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.userName
            })
        })
}