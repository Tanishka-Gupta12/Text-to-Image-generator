import React, { useState } from 'react';
import './App.css';
const App = () => {
  const [output, setOutput] = useState('');
  const [query, setQuery] = useState('');

  const genImage = async () => {
    const data = { "inputs": query }; // Define 'data' variable
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    console.log(response);
    const result = await response.blob();
    setOutput(URL.createObjectURL(result)); // Use URL.createObjectURL to display the image
    return result;
  }

  return (
    <div className='main'>
      <h1 id='head'>Text to Image Generator</h1>
      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button className='button' onClick={genImage}>Generate</button>
      {output && <img src={output} alt="Generated Image" />} {/* Display the image */}
    </div>
  )
}

export default App;