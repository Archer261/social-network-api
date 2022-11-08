const User = require('../models/User');
const Thought = require('../models/Thought')
const Reaction = require('../models/Reaction')

// find a single Thought and delete
module.exports = {
    addReaction(req, res) {
        Reaction.create(req.body)
            .then(function (res) {
                if (!res) throw new Error('User not found');
                else console.log(res._id)
                return res
            }
            )
            .then((rId) => {
                console.log(rId)
                return Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: rId } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no reaction found' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));

    },

    // find a single Thought and delete
    deleteReaction(req, res) {

        Reaction.findOneAndDelete(
            { _id: req.params.reactionId }
        )
            .then(reactionData => res.json(reactionData))
            .catch(err => res.json(err))
    }
}

