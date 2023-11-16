import { Link, useNavigate } from "react-router-dom";
import account from "/account.svg";
import key from "/key.svg";
import { useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import useTogglePassword from '../components/useTogglePassword';
import eye_close from "/eye_close.svg";
import eye_open from "/eye_open.svg";
import {notify_failed,ToastContainer} from "../components/toast-notify"

interface FormData {
  username: string;
  password: string;
}

function RegisterPage() {
  const navigates = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //Password Toggle Hide Button
  const { showPassword, handleTogglePassword} = useTogglePassword();
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api-satrio-efb719eaf55c.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //console.log("User registered successfully");
        navigates(`/login?registrationSuccess=true`);
      } else {
        // Registration failed, handle the error
        const responseData = await response.json();
        notify_failed(responseData.errMessage);
      }
    } catch (error) {
      //console.error("Error during registration:", error);
    }
  };

  return (
      <div className="card">
      <h1>Register</h1>
      <div className="card">
      <form onSubmit={handleFormSubmit}>
      <div className="input-container">
         <img src={account} width={"30px"} height={"30px"}/>
         <input className="input-box" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange}/>
        </div>
        <div className="input-container">
         <img src={key} width={"30px"} height={"30px"}/>
         <input className="input-box" type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
    <button
      type="button"
      className="toggle-password-button"
      onClick={handleTogglePassword}
      style={{ visibility: 'hidden', border: 'none', padding: 0 }}>
      {showPassword ? (<img src={eye_close} alt="Eye Close" width="12px" height="12px" style={{ visibility: "visible" }}/>) : (
    <img src={eye_open} alt="Eye Open" width="12px" height="12px" style={{ visibility: "visible"}} />)}
    </button>
        </div>
        <button type="submit">Register</button>
        <ToastContainer/>
      </form>
      </div>
      <p className="grey"> 
        already have account? <Link to="/login" style={{color: 'white'}}>Login</Link>
      </p>
      </div>
  );
}
  
  export default RegisterPage;