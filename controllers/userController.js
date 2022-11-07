const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                console.log("Uh Oh, something went wrong");
                res.status(500).json({ message: "something went wrong" });
            }

        })
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
};
