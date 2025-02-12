import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import HomePage from "./pages/home/HomePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import SchedulePage from "./pages/schedule/SchedulePage";
import React from "react";
import ScheduleListPage from "./pages/schedule/ScheduleListPage";
import ProfileEditPage from "./pages/user/ProfileEditPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<HomePage />} />

        {/* 인증 관련 라우트*/}
        <Route path="/users/login" element={<LoginPage/> } />
        <Route path="/users/signup" element={<SignupPage/> } />
        <Route path="/users/me" element={<ProfileEditPage/>} />

        {/* 일정관리 관련 라우트 */}
        <Route path="/schedules" element={
            <PrivateRoute>
                <SchedulePage />
            </PrivateRoute>
        } />
        <Route path="/schedules/all" element={
            <PrivateRoute>
                <ScheduleListPage />
            </PrivateRoute>
        } />


        {/* 잘못된 경로는 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace /> } />

      </Routes>
    </Router>
  );
}

export default App;
