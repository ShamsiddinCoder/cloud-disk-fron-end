import React, {useEffect, useState} from 'react';
import s from './disk.module.css';
import {useDispatch, useSelector} from 'react-redux';
import getFiles from '../../Actions/GetFiles';
import FileList from './FileList/FileList';
import { setCurrentDir, setFileView, setPopupDisplay } from '../../reducers/fileReducer';
import Popup from './Popup';
import { uploadFile } from '../../Actions/GetFiles';
import Uploader from './Upload/Uploader';
import Loader from './Loader/Loader';
import logoList from '../../assets/list_icon.png';
import logoPlate from '../../assets/plate_icon.png';

export default function Disk() {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const dirStack = useSelector(state => state.files.dirStack);
  const loader = useSelector(state => state.loader.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');
  
  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);
  
  function showPopupHandler (){
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler(){
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event){
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }
  
  function dragLeaveHandler(event){
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }
  
  function dropHandler(event){
    console.log(dragEnter);
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if(loader){
    return (
      <Loader />
    )
  }else {
    return (!dragEnter ?
      <div className={s.disk} 
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragEnterHandler}
      >
        <div className={s.disk_header}>
          <div className={s.disk_actions}>
            <button className={s.disk_back} onClick={() => backClickHandler()}>Nazad</button>
            <button className={s.disk_create} onClick={() => showPopupHandler()}>Sozdat papku</button>
            <div className={s.disk_upload}>
              <label htmlFor='disk_upload-input' className={s.disk_upload_label}>Zagruzka</label>
              <input multiple={true} onChange={(event) => fileUploadHandler(event)} type='file' id="disk_upload-input" className={s.disk_upload_input} />
            </div>
            <select value={sort} className={s.disk_select}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value='name'>Po nazvaniye</option>
              <option value='type'>Po tipu</option>
              <option value='date'>Po datu</option>
            </select>
          </div>

          <div className={s.change_list}>
            <button className={s.disk_plate} onClick={() => dispatch(setFileView('plate'))}>
              <img src={logoPlate} />
            </button>
            <button className={s.disk_list} onClick={() => dispatch(setFileView('list'))}>
              <img src={logoList} />
            </button>
          </div>

        </div>
        <FileList />
        <Popup />
        <Uploader />
      </div>
      :
      <div 
          onDrop={dropHandler}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
        className={s.drop_area}>
            Peretashiti file syuda!
      </div>
  
    )
  }

  
}
