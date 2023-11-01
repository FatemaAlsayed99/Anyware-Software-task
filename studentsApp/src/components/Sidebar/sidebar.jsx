import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";
import { useDispatch } from 'react-redux';
import { changeAuthenticated } from '../../Store/Slices/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = () => {
  dispatch(changeAuthenticated(false)); 
  localStorage.setItem('isAuthenticated', false);
  navigate('/');
};
  return (
   
    <div>
     <div data-testid="sidebar">

      <ul>
        <li>
          <Link to="/"><h4>Home</h4></Link>
        </li>
        <li>
          <Link to="/Dashboard"><h4>Dashboard</h4></Link>
        </li>
        <li>
          <Link to="/Dashboard/Quizzes">Quizzes</Link>
        </li>
        <li>
          <Link to="/Dashboard/Announcements">Announcements</Link>
        </li>
        <li>
        <LogoutIcon className='logout' onClick={handleLogout}/>
        </li>
      </ul>
      </div>
    </div>
    
  );
};

export default Sidebar;