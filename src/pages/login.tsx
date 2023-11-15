import { Link } from "react-router-dom";
import account from "/account.svg";
import key from "/key.svg";

function LoginPage() {
  return (
      <div className="card">
      <h1>Login</h1>
      
      <div className="card">
      <div className="input-container">
        <img src={account} width={"30px"} height={"30px"}/>
        <input className="input-box" name="username" placeholder="Email/Username"/>
      </div>
      <div className="input-container">
      <img src={key} width={"30px"} height={"30px"}/>
        <input className="input-box" name="password" placeholder="Password"/>
      </div>
      </div>
     
      <button>Login</button>
      <p className="grey">
      Dont Have Account yet? <Link to="/register" style={{color: 'white'}}>Register</Link>
      </p>
      </div>
  );
}

export default LoginPage;