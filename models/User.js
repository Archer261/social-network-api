const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            max_length: 50,
        },
        thoughts: [thoughtsSchema],
        friends: [friendsSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;