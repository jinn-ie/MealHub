import { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);
  };

  return (
    <div className="Login">
        <div className="orange-nav">
        <h3>MEALHUB</h3>
        </div>
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>ID</label>
            <input type="text" name="username" onChange={handleChange} />
            <label>비밀번호</label>
            <input type="password" name="password" onChange={handleChange} />
            <button className="submit" type="submit">로그인</button>
            <a>계정이 없으시다면? 회원가입</a>
        </form>
    </div>
  );
}

export default Login;
