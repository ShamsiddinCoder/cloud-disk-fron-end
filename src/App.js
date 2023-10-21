import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Registration from './Components/Register/Registration';
import Login from './Components/Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from './Actions/User';
import Disk from './Components/Disk/disk';
import Profile from './Components/Profile/Profile';

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
          <Navbar />
          <div className='wrap'>
            {!isAuth ?
                <Routes>
                  <Route path='/registration' Component={Registration} />
                  <Route path='/login' Component={Login} />
                  {/* <Navigate path='/login'/> */}
                </Routes>
                :
                <Routes>
                  <Route exact path='/' Component={Disk} />
                  <Route exact path='/profile' Component={Profile} />
                  {/* <Navigate path='/'/> */}
                </Routes>
            }
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
