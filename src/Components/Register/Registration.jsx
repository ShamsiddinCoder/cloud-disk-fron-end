import React, {useState} from 'react';
import s from './Registration.module.css';
import { registration } from '../../Actions/User';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={s.register}>
      <div className={s.register_inner}>
        <h3>Registratsiya</h3>
        <div className={s.register_input}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Vvidite emial..." />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Vvidite parol..." />
        </div>
        <div className={s.register_button}>
          <button onClick={() => registration(email, password)}>Registratsiya</button>
        </div>
      </div>
    </div>
  )
}
