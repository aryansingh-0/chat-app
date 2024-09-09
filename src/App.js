import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Component/chat/chat";
import Join from "./Component/join/join";
function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
