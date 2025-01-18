import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

 const RichTextEditor = ({inputData, setInputData}) =>{
  // const [value, setValue] = useState('');
  const handleInputData = (value) => {
    setInputData({
      ...inputData,
      description: value
    })
  }

  return <ReactQuill theme="snow" value={inputData} onChange={handleInputData}  />;
}


export default RichTextEditor;