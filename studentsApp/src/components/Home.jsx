import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeAuthenticated } from '../Store/Slices/auth';
import './Home.scss';

const Home = () => {
  
  var isAuthenticated = useSelector((state) => state.Authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let storedAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedAuthenticated) {
      dispatch(changeAuthenticated(storedAuthenticated === 'true'));
    }
  }, []);

  const handleAuthentication = () => {

      dispatch(changeAuthenticated(true));
      localStorage.setItem('isAuthenticated', true);
      navigate('/Dashboard');
      isAuthenticated = true
    
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to the Home Page</h1>
      <button className="auth-button" onClick={handleAuthentication}>
        {isAuthenticated == false ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default Home;