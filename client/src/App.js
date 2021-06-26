import { Route, BrowserRouter as Router } from "react-router-dom";
import Redirect from "./Redirect";
import './App.css';

function App() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked")
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/:code" component={Redirect} />
      </Router>
      <header className="App-header">
        <p>
          Fill in a url to shorten
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text"></input>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
