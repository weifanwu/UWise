import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState({selectedFile: null});
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [web, setWeb] = useState('');

  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleLink = (event) => {
    setWeb(event.target.value);
  };

  const handleGroup = (event) => {
    setGroup(event.target.value);
  };

  const addResource = async (link) => {
    const response = await fetch("https://uwise-back-end.herokuapp.com/addResource", {
      method: "POST",
      body: JSON.stringify({"title": title, "group": group, "text": text, "link": link, "web" : web}),
    });
    const book = await response.text();
    console.log(book)
  };

  async function upload() {
    const apiKey = '14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf'; // Replace with your SM.MS API key
    const apiUrl = "/api/v2/upload";
  
    const formData = new FormData();
    formData.append('smfile', file["selectedFile"]);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: apiKey,
        },
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        const url = result.data["url"];
        addResource(url);
        // Do something with the uploaded image URL
      } else {
        console.error('Image upload failed');
        // Handle the upload failure
      }
    } catch (error) {
      console.error('Error occurred during image upload', error);
      // Handle the error
    }  
  }

  return (
    <>
      <div className='panel'>
        <h1>Add resource</h1>
        <label>
          标题: 
          <input type="text" onChange={handleTitle}/>
        </label>
        <label>
          链接: 
          <input type="text" onChange={handleLink}/>
        </label>
        <label>
          分组: 
          <input type="text" onChange={handleGroup}/>
        </label>
        <label>
          内容：
          <textarea value={text} onChange={handleChange} />
        </label>
        <label>
          文件：
          <input type='file' onChange={onFileChange} />
        </label>
        <button onClick={()=> {
          upload();
        }}>upload!</button>
      </div>
    </>
  );
}

export default App;