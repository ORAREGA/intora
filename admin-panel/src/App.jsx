import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminlayout/*" element={<AdminLayout />} />
        <Route path="/userlayout/*" element={<UserLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
