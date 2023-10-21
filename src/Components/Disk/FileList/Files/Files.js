import React, {useEffect, useState} from 'react';
import s from './Files.module.css';
import dirLogo from '../../../../assets/dir_logo.png';
import fileLogo from '../../../../assets/file_logo.png';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentDir, pushToStack } from '../../../../reducers/fileReducer';
import { downLoadFile, deleteFile } from '../../../../Actions/GetFiles';
import SizeFormat from '../../../../Utils/SizeFormat';
import { nameLength } from '../../../../Actions/Hover';
import FilesHover from './FilesHover/FilesHover';

export default function Files({file}) {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const fileView = useSelector(state => state.files.view);
  const [newNames, setNewNames] = useState('');
  const [hoverBtns, setHoverBtns] = useState(false);
  
  useEffect(() => {
    let resolveNames = nameLength(file.name);
    setNewNames(resolveNames);
  }, []);
  
  function opnDIrHandler(file){
    if(file.type === 'dir'){
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e){
    e.stopPropagation();
    downLoadFile(file);
  }

  function deleteClickHandler(e){
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if(fileView === 'list'){
    return (
      <div className={s.files} onDoubleClick={file.type === 'dir' ? () => opnDIrHandler(file) : ''}>
          <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={s.file_img} />
          <div className={s.file_name}>{file.name}</div>
          <div className={s.file_date}>{file.date.slice(0, 10)}</div>
          {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className={s.file_btn_download}>DownLoad</button>}
          <button onClick={(e) => deleteClickHandler(e)} className={s.file_btn_remove}>Delete</button>
          <div className={s.file_size}>{SizeFormat(file.size)}</div>
      </div>
    )
  }

  if(fileView === 'plate'){
    return (
      <div className={s.files_plate} onDoubleClick={file.type === 'dir' ? () => opnDIrHandler(file) : ''}
        onMouseEnter={() => setHoverBtns(true)}
        onMouseLeave={() => setHoverBtns(false)}
      >
          <FilesHover hoverBtns={hoverBtns} names={file.name} type={file.type} 
            downloadFunc={downloadClickHandler}
            deleteFunc = {deleteClickHandler}
          />
          <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={s.file_img_plate} />
          <div className={s.file_name_plate}>{newNames}</div>
      </div>
    )
  }
}
