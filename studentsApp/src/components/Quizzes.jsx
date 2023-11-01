import React, { useEffect, useState } from 'react';
import Instance from './../axiosConfig/instance';
import moment from 'moment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({});

  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  const fetchQuizzes = async () => {
    try {
      const response = await Instance.get('/quiz');
      console.log(response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error displaying data:', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await Instance.delete(`/quiz/delete/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };
  const handleEditQuiz = (quiz) => {
    setFormData({
      studentName: quiz.studentName,
      numberOfQuestions: quiz.numberOfQuestions,
      course: quiz.course,
      questions: quiz.questions,
      id: quiz._id
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
      const existingQuiz = quizzes.find((quiz) => quiz._id === formData.id);
     console.log(existingQuiz)
    if (existingQuiz) {
      console.log(existingQuiz._id) 
      await Instance.patch(`/quiz/update/${existingQuiz._id}`, formData);
  
      setQuizzes(quizzes.map((quiz) => {
        if (quiz._id === existingQuiz._id) {
          return { ...quiz, ...formData };
        }
        return quiz;
      }));
    } else {
      const response = await Instance.post('/quiz/save', formData);
  
      setQuizzes([...quizzes, response.data]);
    }
  
    setFormData({
      studentName: '',
      numberOfQuestions: '',
      course: '',
      questions: '',
      id: ''
    });
    };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <div>
        <h1>Quizzes</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
      <div>
        <h2>Add New Quiz:</h2>
      </div>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="numberOfQuestions"
          placeholder="Number of Questions"
          value={formData.numberOfQuestions}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleInputChange}
        />

        <textarea
          name="questions"
          placeholder="Write your questions..."
          value={formData.questions}
          onChange={handleInputChange}
        />

        <button className='submit' type="submit">Submit</button>
      </form>
      <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Number of Questions</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.studentName}</td>
              <td>{quiz.numberOfQuestions}</td>
              <td>{quiz.course}</td>
              <td>{formatDate(quiz.createdAt)}</td>
              <td>
                <DeleteIcon className='control' onClick={() => handleDeleteQuiz(quiz._id)}/>
                
              </td>
              <td>
                <BorderColorIcon className='control' onClick={() => handleEditQuiz(quiz)}/>
                 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Quizzes;
