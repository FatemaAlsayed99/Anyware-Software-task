import React, { useEffect, useState } from 'react';
import Instance from './../axiosConfig/instance';
import moment from 'moment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({});

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

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      await Instance.delete(`/announcement/delete/${announcementId}`);
      setAnnouncements(announcements.filter((announcement) => announcement._id !== announcementId));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };
  const handleEditAnnouncement = (announcement) => {
    setFormData({
      studentName: announcement.studentName,
      course: announcement.course,
      text: announcement.text,
      id: announcement._id
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
      const existingAnnouncement = announcements.find((announcement) => announcement._id === formData.id);
     console.log(existingAnnouncement)
    if (existingAnnouncement) {
      console.log(existingAnnouncement._id) 
      await Instance.patch(`/announcement/update/${existingAnnouncement._id}`, formData);
  
      setAnnouncements(announcements.map((announcement) => {
        if (announcement._id === existingAnnouncement._id) {
          return { ...announcement, ...formData };
        }
        return announcement;
      }));
    } else {
      const response = await Instance.post('/announcement/save', formData);
  
      setAnnouncements([...announcements, response.data]);
    }
  
    setFormData({
      studentName: '',
      course: '',
      text: '',
      id: ''
    });
    };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <div>
        <h1>Announcements</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
      <div>
        <h2>Add New Announcement:</h2>
      </div>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
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
          name="text"
          placeholder="Write your announcement..."
          value={formData.text}
          onChange={handleInputChange}
        />

        <button className='submit' type="submit">Submit</button>
      </form>
      <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Announcement</th>
            <th>Created Date</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.studentName}</td>
              <td>{announcement.course}</td>
              <td>{announcement.text}</td>
              <td>{formatDate(announcement.createdAt)}</td>
              <td>
                <DeleteIcon className='control' onClick={() => handleDeleteAnnouncement(announcement._id)}/>
                
              </td>
              <td>
                <BorderColorIcon className='control' onClick={() => handleEditAnnouncement(announcement)}/>
                 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};


export default Announcements;