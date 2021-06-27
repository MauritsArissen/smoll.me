import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://smoll.me/shortener", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ longUrl: e.target[0].value })
    })
      .then(response => response.json())
      .then(data => setUrl("https://smoll.me/"+data.url.urlCode));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in a url to shorten
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text"></input>
          <button type="submit">Submit</button>
        </form>
        <p>{url}</p>
      </header>
    </div>
  );
}

export default App;
