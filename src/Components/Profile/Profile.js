import React from 'react';
import s from './Profile.module.css';
import {useDispatch} from 'react-redux';
import { uploadAvatar, deleteAvatar } from '../../Actions/GetFiles';

export default function Profile() {
    const dispatch = useDispatch();

    function changeHandler (e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

  return (
    <div className={s.avatar}>
        <button onClick={() => dispatch(deleteAvatar())}>Udalit Avatar</button>
        <label htmlFor='avatar'>Zagruzit file ...</label>
        <input id='avatar' accept="image/*" type='file' onChange={(e) => changeHandler(e)} />
    </div>
  )
}
