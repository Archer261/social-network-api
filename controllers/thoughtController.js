const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction')

module.exports = {
    getThoughts(req, res) {
        Thought.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                console.log("Uh Oh, something went wrong");
                res.status(500).json({ message: "something went wrong" });
            }

        })
    },

    //find a single Thought by their id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((Thought) =>
                !Thought
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // find a single Thought and update
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
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

    // find a single Thought and delete
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.ThoughtId },
            req.body,
            (err, result) => {
                if (result) {
                    res.status(200).json({ message: `Thought deleted` });
                    console.log(`Thought deleted`);
                } else {
                    console.log("Uh Oh, something went wrong");
                    res.status(500).json({ message: err });
                }
            })
    },


};
