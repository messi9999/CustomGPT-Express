import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ChatPage from "./pages/chat/ChatPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
