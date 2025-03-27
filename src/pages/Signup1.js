import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ id: "", pwd: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // 유효성 검사

    let validationError = "";
    console.log(validationError);

    if (!formData.id) {
        validationError = "아이디를 입력해주세요.";
    }

    else if (!formData.pwd) {
        validationError = "비밀번호를 입력해주세요.";
    }

    else if (!formData.checkpwd) {
        validationError = "비밀번호 확인을 입력해주세요.";
    }

    else if (formData.pwd !== formData.checkpwd) {
        validationError = "비밀번호가 일치하지 않습니다.";
    }

    if (Object.keys(validationError).length > 0) {
        setError(validationError); // 에러 메시지 설정
        return; // 에러가 있으면 제출하지 않음
    }

    console.log("회원가입 데이터:", formData);
    navigate("/signup2");
  };

  useEffect(() => {
    if(error!==null){
      alert(error);
      console.log("error:", error);
    }
  }, [error]);

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
                        <input type="email" name="id" onChange={handleChange} />
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
                <label>ID</label>
                <div className="input-group">
                <input type="text" className="id" name="id" onChange={handleChange} />
                <button className="checkid">중복 확인</button>
                </div>
            </div>
            <div className="form-group">
                <label>비밀번호</label>
                <input type="password" name="pwd" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>비밀번호 확인</label>
                <input type="password" name="checkpwd" onChange={handleChange} />
            </div>
            <button className="submit" type="submit">다음</button>
            <a onClick={() => navigate("/login")}>계정이 있으시다면? 로그인</a>
        </form>
    </div>
  );
}

export default Signup1;
