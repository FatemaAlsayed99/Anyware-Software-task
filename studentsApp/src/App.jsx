import React from 'react';
import { Provider } from 'react-redux';
// import { useSelector } from 'react-redux';
import store from './Store/store';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quizzes from './components/Quizzes';
import Welcome from './components/welcome';
import Dashboard from './components/Dashboard';
import Announcements from './components/Announcements';

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 
  return (
    <Provider store={store}>
    <BrowserRouter>

    <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/Dashboard' element={<Dashboard/>}>
      
    <Route  path='Quizzes' element={<Quizzes />}/>
    <Route  path='Announcements' element={<Announcements />}/>
    <Route  index element={<Welcome />}/>

    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;