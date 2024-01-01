import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios/apiServerInstance.js";

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // 실제로는 서버의 엔드포인트와 통신하여 로그인을 처리합니다.
      const response = await api.post("/sign-in", {
        userId,
        password,
      });

      // 서버로부터 성공적인 응답을 받았을 때
      if (response.status === 200) {
        let { userName, role, token } = response.data;
        // 세션에 사용자 정보 저장
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("role", role);
        // 다음 페이지로 이동
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error during login. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>UserId:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
