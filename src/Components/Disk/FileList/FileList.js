import React from 'react';
import s from './FileList.module.css';
import Files from './Files/Files';
import { useSelector } from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Loader from '../Loader/Loader';

export default function FileList() {
    // const files = useSelector(state => console.log(state.files.files));
    const files = useSelector(state => state.files.files);
    const fileView = useSelector(state => state.files.view);
    
    // const files = [
    //     {_id: 1, name: 'direct', type: 'dir', size: '5gb', date: '20.02.2020'},
    //     {_id: 2, name: 'direct', type: 'jpg', size: '5gb', date: '20.02.2020'}
    // ].map(file => <Files file={file} key={file.id} />);

  if(files.length === 0){
    return (
      <div className={s.loaderTitle}>
        <h3>File ne naydena</h3>
        <Loader />
      </div>
    )
  }

  if(fileView === 'plate'){
    return (
      <div className={s.filePlate}>
        {files?.map(file => <Files file={file} key={file.id} />)}
      </div>
    )
  }

  if(fileView === 'list'){
    return (
      <div className={s.fileList}>
          <div className={s.fileList_header}>
              <div className={s.fileList_name}>Nazvanie</div>
              <div className={s.fileList_date}>Date</div>
              <div className={s.fileList_size}>Size</div>
          </div>
          <TransitionGroup>
            {files?.map(file => 
                <CSSTransition
                  key={file.is}
                  timeout={500}
                  classNames={'file'}
                  exit={false}
                >
                  <Files file={file} key={file.id} />
                </CSSTransition>
              )}
          </TransitionGroup>
      </div>
    )
  }
}
