import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup2() {
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
        <form className="login-form signup2" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>성별</label>
                    <div className="input">
                    <label><input type="radio" className="check" name="sex" onChange={handleChange} />남성</label>
                    <label><input type="radio" className="check" name="sex" onChange={handleChange} />여성</label>
                    </div>
            </div>
            <div className="form-group">
                <label>생년월일</label>
                <input type="date" name="password" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>알레르기</label>
                    <div className="input">
                    <label><input type="checkbox" className="check" name="allergy" value="난류" onChange={handleChange} />난류</label>
                    <label><input type="checkbox" className="check" name="allergy" value="우유" onChange={handleChange} />우유</label>
                    <label><input type="checkbox" className="check" name="allergy" value="땅콩" onChange={handleChange} />땅콩</label>
                    </div>
            </div>
            <div className="form-group">
                <label>선호<br/>카테고리</label>
                <div className="br">
                    <div className="input">
                    <label><input type="checkbox" className="check" name="category" value="한식" onChange={handleChange} />한식</label>
                    <label><input type="checkbox" className="check" name="category" value="중식" onChange={handleChange} />중식</label>
                    <label><input type="checkbox" className="check" name="category" value="일식" onChange={handleChange} />일식</label>
                    </div>
                    <div className="input">
                    <label><input type="checkbox" className="check" name="category" value="양식" onChange={handleChange} />양식</label>
                    <label><input type="checkbox" className="check" name="category" value="분식" onChange={handleChange} />분식</label>
                    </div>
                </div>
            </div>
            <button className="submit" type="submit" onClick={() => navigate("/")}>가입</button>
            <a onClick={() => navigate("/login")}>계정이 있으시다면? 로그인</a>
        </form>
    </div>
  );
}

export default Signup2;
