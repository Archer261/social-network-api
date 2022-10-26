const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectID,
            default: new ObjectID,
            required: true,
            max_length: 280,
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
