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

    //find a single user by their id
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

    // find a single user and update
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`);
                } else {
                    console.log("Uh Oh, something went wrong");
                    res.status(500).json({ message: err });
                }
            })
    },

    // find a single user and delete
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            req.body,
            (err, result) => {
                if (result) {
                    res.status(200).json({ message: `Username ${result.username} deleted` });
                    console.log(`Username "${result.username}" deleted`);
                } else {
                    console.log("Uh Oh, something went wrong");
                    res.status(500).json({ message: err });
                }
            })
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then(userResults => {
                if (!userResults) {
                    res.status(404).json({ message: 'There was no friend found with this id' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $addToSet: { friends: req.params.userId } },
                    { new: true }
                )
                    .then(results => {
                        if (!results) {
                            res.status(404).json({ message: 'There was no friend found with this id' })
                            return;
                        }
                        res.json(userResults);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.id } },
            { new: true }
        ).then((data) => {
            if (!data) {
                res.status(404).json({ message: "No friends with this id" });
                return;
            }
            User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }
            )
                .then((data) => {
                    if (!data) {
                        res.status(404).json({ message: "No friends with this id" });
                    }
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    },
};
