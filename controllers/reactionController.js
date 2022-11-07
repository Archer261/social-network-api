const User = require('../models/User');
const Thought = require('../models/Thought')
const Reaction = require('../models/Reaction')

// find a single Thought and delete
module.exports = {
    addReaction({ params, body }, res) {
        Reaction.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true },
                    (err, results) => {
                        if (results) {
                            res.status(200).json(results);
                            console.log(`Updated: ${results}`);
                        } else {
                            console.log("Uh Oh, something went wrong");
                            res.status(500).json({ message: err });
                        }
                    })
            })
    },

    // find a single Thought and delete
    deleteReaction(req, res) {
        // Reaction.findOneAndDelete(
        //     { _id: req.params.thoughId, reactions: { _id: req.paramsreactionId } },
        //     { $push: { reactions: req.body } },
        //     (err, result) => {
        //         if (result) {
        //             res.status(200).json({ message: `Thought deleted` });
        //             console.log(`Thought deleted`);
        //         } else {
        //             console.log("Uh Oh, something went wrong");
        //             res.status(500).json({ message: err });
        //         }
        //     })
    },

}