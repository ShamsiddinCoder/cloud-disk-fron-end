import React from 'react';
import s from './Uploader.module.css';
import {useDispatch} from 'react-redux';
import { removeUpload } from '../../../reducers/UploadReducer';

export default function Upload({file}) {
    const dispatch = useDispatch();
    console.log(file);

  return (
    <div className={s.uploadFile}>
        <div className={s.uploadFile_header}>
            <div className={s.uploadFile_name}>{file.name}</div>
            <button className={s.uploadFile_remove} onClick={() => dispatch(removeUpload(file.id))}>X</button>
        </div>
        <div className={s.uploadFile_progress}>
            <div className={s.uploadFile_uploadBar} style={{width: file.progress + '%'}}  />
            <div className={s.uploadFile_percent}>{file.progress}%</div>
        </div>
    </div>
  )
}