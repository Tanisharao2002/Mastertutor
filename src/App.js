import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Site from "./Component/Site3.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Site />
      </BrowserRouter>
    </div>
  );
}

export default App;
