import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import HomePage from "./pages/home/HomePage";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={
            <PrivateRoute>
                <div>캘린더 페이지</div>
            </PrivateRoute>
        }  />
        {/* 인증 관련 라우트*/}
        <Route path="/users/login" element={<LoginPage/> } />
        <Route path="/users/signup" element={<SignupPage/> } />

        <Route path="*" element={<Navigate to="/" replace /> } />

      </Routes>
    </Router>
  );
}

export default App;
