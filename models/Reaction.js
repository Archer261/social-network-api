const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Assignment');

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
            get: () => formatDate()
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

// function formatDate(input) {
//     const separatorIndex = email.indexOf('@');
//     if (separatorIndex < 3) {

//         return email.slice(0, separatorIndex).replace(/./g, '*') +
//             email.slice(separatorIndex);
//     }
// }

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
