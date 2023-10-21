import React from 'react';
import s from './Uploader.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { hideUpload } from '../../../reducers/UploadReducer';
import Upload from './Upload';

export default function Uploader() {
    // const files = [
    //     {id: 1, name: 'Photo', progress: 0}, 
    //     {id: 2, name: 'file', progress: 10},
    //     {id: 3, name: 'file', progress: 80}
    // ];

    const dispatch = useDispatch();
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(file => file.upload.isVisible);

  return (isVisible &&
    <div className={s.uploader}>
        <div className={s.uploader_header}>
            <div className={s.uploader_title}>Zagruzka</div>
            <button className={s.uploader_close} onClick={() => dispatch(hideUpload())}>X</button>
        </div>
        {files?.map(file => <Upload key={file.id} file={file} />)}
    </div>
  )
}
