import React, {useState} from 'react';
import s from './Navbar.module.css';
import Nav_Logo from '../../assets/nav_logo.png';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../reducers/userReducer';
import { showLoader } from '../../reducers/AppReducer';
import { searchFiles } from '../../Actions/GetFiles';
import getFiles from '../../Actions/GetFiles';
import avatarLogo from '../../assets/avatar.png';
import {API_URL} from '../../Config';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth);
  const currentDir = useSelector(state => state.files.currentDir);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;
  const navigate = useNavigate();

  function searchChangeHandler(e){
    setSearch(e.target.value);

    if(searchTimeout !== false){
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if(e.target.value !== ''){
      setSearchTimeout(setTimeout(value => {
        dispatch(searchFiles(value));
        console.log(value);
      }, 300, e.target.value));
    }else {
      dispatch(getFiles(currentDir));
    }
  }
 
  return (
    <div className={s.navbar}>
      <div className={s.navbar_inner}>
        <div className={s.nav_logo} onClick={() => navigate('/')}>
          <img src={Nav_Logo} alt="" />
          <h4>MERN LOGO</h4>
        </div>
        {isAuth && <input value={search} onChange={(e) => searchChangeHandler(e)} type='text' placeholder='Nazvaniye file...' className={s.search} />}
        <div className={s.nav}>
          {!isAuth && <Link to='/login'>Voyti</Link>}
          {!isAuth && <Link to='/registration'>Registratsiya</Link>}
          {isAuth && <Link to='/' onClick={() => dispatch(logOut())}>Logout</Link>}
          {isAuth && <Link to='/profile'><img src={avatar} alt='Avatar' className={s.navbar_avatar} /></Link>}
        </div>
      </div>
    </div>
  )
}
