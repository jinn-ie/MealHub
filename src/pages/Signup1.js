import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);
  };

  return (
    <div className="App Login">
        <div className="orange-nav">
        <h3>MEALHUB</h3>
        </div>
        <h2>회원가입</h2>
        <form className="login-form signup1" onSubmit={handleSubmit}>
            {/* <div className="form-group">
                <label>e-mail</label>
                    <div className="input">
                        <input type="email" name="username" onChange={handleChange} />
                        <p>@</p>
                        <input type="text" name="domain" list="domainList"></input>
                        <datalist id="domainList">
                            <option value="naver.com" />
                            <option value="daum.net" />
                            <option value="gmail.com" />
                            <option value="hanmail.net" />
                            <option value="pusan.ac.kr" />
                        </datalist>
                    </div>
            </div> */}
            
            <div className="form-group">
                <label>닉네임</label>
                <input type="text" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>비밀번호</label>
                <input type="password" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>비밀번호 확인</label>
                <input type="password" className="checkpwd" onChange={handleChange} />
            </div>
            <button className="submit" type="submit" onClick={() => navigate("/signup2")}>다음</button>
            <a onClick={() => navigate("/login")}>계정이 있으시다면? 로그인</a>
        </form>
    </div>
  );
}

export default Signup1;
