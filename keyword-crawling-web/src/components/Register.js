import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios/apiServerInstance';

const Register = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
  
    const handleRegister = async () => {
      try {
        // 실제로는 서버의 엔드포인트와 통신하여 로그인을 처리합니다.
        const response = await api.post('/sign-up', {
          userId,
          password,
          userName,
          role:'ROLE_USER'
        });
  
        // 서버로부터 성공적인 응답을 받았을 때
        if (response.status === 200) {
          alert('회원가입이 완료되었습니다.')
          // 다음 페이지로 이동
          navigate('/login');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        setError('Error during login. Please try again.');
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
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
        <div>
          <label>UserName:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button onClick={handleRegister}>Confirm</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
};

export default Register;
