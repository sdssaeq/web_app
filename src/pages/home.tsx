import {useNavigate} from "react-router-dom";
import {ToastContainer} from "../components/toast-notify"
function HomePage() {
    let navigate = useNavigate();
    return (
      <>
      <div className="card">
        <h1>Web App</h1>
        <button onClick={()=>{navigate("/login")}}>
            Login
        </button>
        <button onClick={()=>{navigate("/register")}}>
            Register
        </button>
        <p className="grey">
          Simple Web App Login by Satrio Drajat
        </p>
        <ToastContainer/>
      </div>
      </>
    );
  }
export default HomePage;