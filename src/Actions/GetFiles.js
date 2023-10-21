import axios from 'axios';
import { hideLoader, showLoader } from '../reducers/AppReducer';
import { setFiles, addFile, deleteFileAction } from '../reducers/fileReducer';
import { addUpload, showUpload, changeUploadFile } from '../reducers/UploadReducer';
import { API_URL } from '../Config';
import { setUser } from '../reducers/userReducer';

export default function getFiles(dirId, sort){
    
    return async dispatch => {
        try {
            dispatch(showLoader());

            let url = 'http://localhost:5000/api/files';
            if(dirId){
                url = `http://localhost:5000/api/files?parent=${dirId}`;
            }
            if(sort){
                url = `http://localhost:5000/api/files?sort=${sort}`;
            }
            if(dirId && sort){
                url = `http://localhost:5000/api/files?parent=${dirId}&sort${sort}`;
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            
            dispatch(setFiles(response.data));
        } catch (error) {
            alert(error.response.data);
        }finally {
            dispatch(hideLoader());
        }
    }
}

export function createDir(dirId, name){
    return async dispatch => {
        console.log(name, dirId);
        try {
            const response = await axios.post(`http://localhost:5000/api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            console.log(response);
            dispatch(addFile(response.data));
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}

export function uploadFile(file, dirId){
    return async dispatch => {
        try {
            const formDate = new FormData();
            formDate.append('file', file);
            if(dirId){
                formDate.append('parent', dirId);
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUpload());
            dispatch(addUpload(uploadFile));
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formDate, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: ProgressEvent => {
                    if(ProgressEvent.event.lengthComputable){
                        uploadFile.progress = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
                        dispatch(changeUploadFile(uploadFile));
                        console.log(uploadFile);
                    }
                }
            });

            dispatch(addFile(response.data));
            // console.log(response.data);

        } catch (e) {
            alert(e.response.data.message);
        }
    }
}

export async function downLoadFile(file){
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    });

    if(response.status === 200){
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file){
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setFiles(response.data));
        } catch (error) {
            // alert(error?.response?.message);
        }finally{
            dispatch(hideLoader());
        }
    }
}

export function uploadAvatar(file){
    return async dispatch => {
        try {
            
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            console.log(response.data);
            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export function deleteAvatar(file){
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}