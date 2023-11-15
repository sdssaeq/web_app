import { Link } from "react-router-dom";
import account from "/account.svg";
import key from "/key.svg";
import { useState, ChangeEvent, FormEvent} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  username: string;
  password: string;
}

function RegisterPage() {

  const notify_sucess = (message : string) => toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

    const notify_failed = (message : string) => toast.error(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //console.log("User registered successfully");
        notify_sucess("User registered successfully");
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
         <input className="input-box" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
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