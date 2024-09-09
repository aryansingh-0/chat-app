import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Join from "./Component/join/join";
import Chat from "./Component/chat/chat";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
