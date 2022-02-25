import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Login from "./components/Login";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <ReactNotification />
      <div>
        <header>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
