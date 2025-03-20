import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 데이터:", formData);
  };

  return (
    <div className="App Login">
        <div className="orange-nav">
        <h3>MEALHUB</h3>
        </div>
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
            <button className="submit" type="submit">로그인</button>
            <a onClick={() => navigate("/signup1")}>계정이 없으시다면? 회원가입</a>
        </form>
    </div>
  );
}

export default Login;
