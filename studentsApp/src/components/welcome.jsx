import React from 'react';
import  { useEffect, useState } from 'react';
import Instance from './../axiosConfig/instance';
import moment from 'moment';

const Welcome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  
  const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await Instance.get('/announcement');
      console.log(response.data);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error displaying data:', error);
    }
  };
  const fetchQuizzes = async () => {
    try {
      const response = await Instance.get('/quiz');
      console.log(response.data)
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error displaying data:', error);
    }
  };

 
  useEffect(() => {
    fetchQuizzes();
    fetchAnnouncements();
  }, []);
  return (
    <div>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <div className="wrapper">
        <h2>Quizzes</h2>
        <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Number of Questions</th>
            <th>Course</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.studentName}</td>
              <td>{quiz.numberOfQuestions}</td>
              <td>{quiz.course}</td>
              <td>{formatDate(quiz.createdAt)}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="wrapper">
      <h2>Announcements</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Announcement</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td data-testid='dashboard'>{announcement.studentName}</td>
              <td>{announcement.course}</td>
              <td>{announcement.text}</td>
              <td>{formatDate(announcement.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default Welcome;