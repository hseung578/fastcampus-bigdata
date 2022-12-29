import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Chat from "./routes/chat";
import Main from "./routes/main";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
