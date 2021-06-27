import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons"

function App() {

  // Initiate states
  const [url, setUrl] = useState();
  const [showUrl, setShowUrl] = useState(false);
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  // Handle functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "") return; 
    fetch("https://smoll.me/shortener", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ longUrl: e.target[0].value })
    })
      .then(response => response.json())
      .then(data => {
        const errMsg = data.errors ? data.errors.message : data.message;
        setShowInfo(false);
        if (errMsg) {
          setShowUrl(false);
          setError(errMsg);
          setShowError(true);
          return;
        }
        setUrl("https://smoll.me/"+data.url.urlCode);
        setShowUrl(true);
        setError("");
        setShowError(false);
      });
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  }

  // Render web component
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="URL here"></input>
          <button type="submit">Shorten</button>
        </form>
        {showInfo ? <p className="info-message">Welcome to smoll.me, fill your url in above</p> : null }
        {showError ? <p className="error-message">{error}</p> : null }
        {showUrl ? <p className="url-message"><span id="copyThis">{url}</span> <FontAwesomeIcon onClick={copyUrl} className="copyButton" icon={faCopy} /></p> : null }
      </header>
    </div>
  );
}

export default App;
