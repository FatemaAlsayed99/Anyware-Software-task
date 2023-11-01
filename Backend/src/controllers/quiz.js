const quizModel = require('../models/quiz')

module.exports.getQuiz = async(req,res)=>{
    const quiz = await quizModel.find()
    res.send(quiz)
}

module.exports.saveQuiz = async(req,res)=>{
  const data = req.body
  try{
   const newQuize= await quizModel.create(data)
        console.log('Add Successfully')
        return res.status(200).json(newQuize)
    }catch (error) {
      console.error("Error saving new quize:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.updateQuiz = async (req, res) => {
    const quizId = req.params.quizId;
    const data = req.body
  
    try {
      const updatedData = await quizModel.findByIdAndUpdate({_id: quizId}, data);
      res.status(200).json(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.deleteQuiz = async (req, res) => {
    const quizId = req.params.quizId;
  
    try {
      await quizModel.findByIdAndDelete({_id: quizId});
      res.status(200).json('Deleted Successfully');
    } catch (err) {
      console.log(err);
    }
  };