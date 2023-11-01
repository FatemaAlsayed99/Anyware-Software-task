const {Router} = require("express");
const { getQuiz, saveQuiz, updateQuiz, deleteQuiz } = require("../controllers/quiz");

const router = Router()

router.get('/', getQuiz)
router.post('/save', saveQuiz)
router.patch('/update/:quizId', updateQuiz)
router.delete('/delete/:quizId', deleteQuiz)


module.exports = router;