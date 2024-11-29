import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 인증 관련 라우트*/}
        <Route path="/users/login" element={<LoginPage/> } />
        <Route path="/users/signup" element={<SignupPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
