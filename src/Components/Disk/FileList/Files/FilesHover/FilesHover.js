import React from 'react';
import s from './FilesHover.module.css';

export default function FilesHover({hoverBtns, names, type, downloadFunc, deleteFunc}) {
    console.log(hoverBtns);
  return (
    <div className={s.fileHover} style={{
        visibility: hoverBtns ? 'visible' : 'hidden',
        opacity: hoverBtns ? 1 : 0
      }}>
        <h4>{names}</h4>
        <div className={s.fileHover_btns}>
            {type !== 'dir' && <button onClick={(e) => downloadFunc(e)} >Download</button >}
            <button onClick={(e) => deleteFunc(e)}  >Delete</button>
        </div>
    </div>
  )
}
