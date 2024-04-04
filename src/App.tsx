import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/SignUp/SignUp";
import { Home } from "./pages/Home/Home";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={user ? <Home /> : <Navigate replace to="/signup" />}
      />
    </Routes>
  );
}

export default App;
