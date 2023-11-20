import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginPage setUsername={setUsername} setPassword={setPassword} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard username={username} password={password} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
