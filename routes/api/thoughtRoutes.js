const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionController')

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/:reactions').post(addReaction)

router.route('/:thoughtId/:reactions/:reactionId').delete(deleteReaction)

module.exports = router;