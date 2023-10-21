import React, {useState} from 'react';
import s from './Login.module.css';
import { login } from '../../Actions/User';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className={s.login}>
      <div className={s.login_inner}>
        <h3>Avtorizatsiya</h3>
        <div className={s.login_inputs}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Vvidite adress elektronnoy pochti...' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Vvidite parol...' />
        </div>
        <div className={s.login_btn}>
          <button onClick={() => dispatch(login(email, password))}><Link to='/'>Voyti</Link></button>
        </div>
      </div>
    </div>
  )
}
