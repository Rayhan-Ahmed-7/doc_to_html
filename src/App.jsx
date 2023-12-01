import mammoth from 'mammoth'

import './App.css'
// App.jsx / App.tsx

import React, { useEffect, useState } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

// import doc from "./assets/test.docx";
function App() {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Use Mammoth.js to convert .docx to HTML
    mammoth.convertToHtml({ arrayBuffer: selectedFile })
      .then(result => setHtmlContent(result.value))
      .catch(error => console.error('Error converting .docx to HTML:', error));
  };
  console.log(htmlContent)
  useEffect(() => {
    const editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: htmlContent
    });

    editor.getMarkdown();
  }, [htmlContent])
  return (
    <>
      <img src="src/assets/react.svg" alt="fghjgkgft" />
      <input type="file" onChange={handleFileChange} />
      <div id="editor"></div>
    </>
  )
}

export default App
