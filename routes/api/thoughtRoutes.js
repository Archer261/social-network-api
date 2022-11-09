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
} = require('../../controllers/reactionController.js')

router.route('/').get(getThoughts).post(createThought)

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route("/:thoughtId").post(addReaction).delete(deleteReaction)

router.route("/:thoughtId/reactions").delete(deleteReaction)

module.exports = router;