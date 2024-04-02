import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import './DragDrop.scss'

const fileTypes = ["WAV", "MP3"];



function DragDrop({ onFileChange }) {
    const [fileOrFiles, setFile] = useState(null);
    const handleChange = (fileOrFiles) => {
      setFile(fileOrFiles);
      console.log('changes', fileOrFiles);
      onFileChange(fileOrFiles);
    };
    const onDrop = (fileOrFiles) => {
      console.log('drop', fileOrFiles);
    };
    const onSelect = (fileOrFiles) => {
      console.log('select', fileOrFiles);
      //check if over 30 seconds
      const audio = new Audio();
      audio.src = URL.createObjectURL(fileOrFiles[0]);
      audio.addEventListener('loadedmetadata', () => {
            const durationInSeconds = Math.floor(audio.duration);
            if (durationInSeconds > 30) {
                alert('File must be 30 seconds or less');
                setFile(null);
            }
        });
    };
  
    const onTypeError = (err = 1) => console.log(err);
    const onSizeError = (err = 1) => console.log(err);
    // TODO: Find a better looking one
    return (
        <div className="drag-drop">
            <FileUploader
            className="drag-drop"
            fileOrFiles={fileOrFiles}
            onTypeError={onTypeError}
            handleChange={handleChange}
            name="image"
            types={fileTypes}
            onSizeError={onSizeError}
            onDrop={onDrop}
            onSelect={onSelect}
            dropMessageStyle={{backgroundColor: 'red'}}
            multiple
            />
        </div>
    );
}

export default DragDrop;
