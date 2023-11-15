import { Link } from "react-router-dom";
import account from "/account.svg";
import key from "/key.svg";
function RegisterPage() {
    return (
        <div className="card">
        <h1>Register</h1>
        
        <div className="card">
      <div className="input-container">
        <img src={account} width={"30px"} height={"30px"}/>
        <input className="input-box" name="firstName" placeholder="Email/Username"/>
      </div>
      <div className="input-container">
      <img src={key} width={"30px"} height={"30px"}/>
        <input className="input-box" name="firstName" placeholder="Password"/>
      </div>
      </div>

        <button>Crate Account</button>
        <p className="grey"> 
          already have account? <Link to="/login" style={{color: 'white'}}>Login</Link>
        </p>
        </div>
    );
  }
  
  export default RegisterPage;