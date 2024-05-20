import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

export const Singup = ({show2,handleClose2}) => {
  
  const [login, setLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(login){
      const data = {
        email,
        password,
      };
      const res = await fetch("http://localhost:9090/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      sessionStorage.setItem('email', json.email);
      if (res.status === 401) {
        alert("Введен неправильный логин или пароль");
      }else{
        alert("Здравствуйте");
        window.location.reload();
      }
    }else{

    
    if (password !== cPass) {
      alert("Password not match");
    } else {
      const data = {
        name,
        email,
        password,
      };
      const res = fetch("http://localhost:9090/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(sessionStorage.getItem('email')){
        sessionStorage.removeItem('email');
      sessionStorage.setItem('email', email);
      }else{
      sessionStorage.setItem('email', email);

      }
      if (res.status === 400) {
        alert("Ошибка регистрации");
      }else{
        alert("Аккаунт успешно создан");
        window.location.reload();
      }
    }
  }
  };
  return (
    <Modal show={show2} onHide={handleClose2}>
    <Modal.Header closeButton>
      
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex flex-column justify-content-center" id="login-box" >
        <div className="login-box-header">
          
          <h4
            style={{
              color: "rgb(139, 139, 139)",
              marginBottom: 0,
              fontWeight: 400,
              fontSize: 27,
            }}
          >
           {login ? "Войти" : "Создать аккаунт"}
            
          </h4>
        </div>
     
        <div className="email-login" style={{ backgroundColor: "#ffffff" }}>
     { login ?null:  <input
            type="text"
            className="email-imput form-control"
            style={{ marginTop: 10 }}
            required=""
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя пользователя"
            minLength={6}
          />}
          <input
            type="email"
            className="email-imput form-control"
            style={{ marginTop: 10 }}
            required=""
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Почта"
            minLength={6}
          />
          <input
            type="password"
            className="password-input form-control"
            style={{ marginTop: 10 }}
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Пароль"
            minLength={6}
          />
        {login ?null :   <input
            type="password"
            className="password-input form-control"
            style={{ marginTop: 10 }}
            required=""
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            name="CPass"
            placeholder="Подтвердите пароль"
            minLength={6}
          />}
        </div>
        <div className="submit-row" style={{ marginBottom: 8, paddingTop: 0 }}>
          <button
            className="btn btn-primary d-block box-shadow w-100"
            id="submit-id-submit"
            onClick={handleSubmit}
            type="submit"
          >
               {login ? "Войти" : "Создать аккаунт"}

          </button>
        </div>
        <div
          id="login-box-footer"
          style={{ padding: "10px 20px", paddingBottom: 23, paddingTop: 18 }}
        >
          <p style={{ marginBottom: 0 }}>
            {login ?"У меня нет аккаунта":"У меня уже есть аккаунт"}
            <a id="register-link" onClick={()=>setLogin(!login)}  >
            {login ? "Создать аккаунт":"Войти"  }
            
            </a>
          </p>
        </div>
      </div>
      </Modal.Body>
        
      </Modal>
  );
};
