import React, {useState} from 'react';
import s from './disk.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from '../../Actions/GetFiles';

export default function Popup() {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();
    
    function createStaticHandler(){
        dispatch(createDir(currentDir, dirName));
    }

  return (
    <div className={s.popup} onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
        <div className={s.popup_content} onClick={(e) => e.stopPropagation()}>
            <div className={s.popup_header}>
                <div className={s.popup_title}>Sozdat noviyu papka</div>
                <button className={s.popup_close} onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
            </div>
            <div className={s.popup_input}>
                <input type="text" placeholder="Vvedite nazvaniye papki..." value={dirName} onChange={(e) => setDirName(e.target.value)} />
                <button className={s.popup_create} onClick={() => createStaticHandler()}>Sozdat</button>
            </div>
        </div>
    </div>
  )
}
