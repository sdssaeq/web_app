import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import account from "/account.svg";
import key from "/key.svg";
import useTogglePassword from "../components/useTogglePassword";
import eye_close from "/eye_close.svg";
import eye_open from "/eye_open.svg";
import {
  notify_success,
  notify_failed,
  ToastContainer,
} from "../components/toast-notify";
import { useAuth } from "../components/auth-contex";
function LoginPage() {
  const location = useLocation();
  const registrationSuccess = new URLSearchParams(location.search).get(
    "registrationSuccess"
  );
  const initialized = useRef(false);
  const navigates = useNavigate();
  const { showPassword, handleTogglePassword } = useTogglePassword();

  const { username, setUsername, password, setPassword } = useAuth();

  useEffect(() => {
    if (registrationSuccess === "true" && !initialized.current) {
      initialized.current = true;
      notify_success("User registered successfully");
      navigates(`/login`);
    }
  }, [registrationSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform login logic and check JWT token here
    // Example: You might make a fetch request to your server for authentication

    try {
      const response = await fetch(
        "https://api-satrio-efb719eaf55c.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        //const responseObject: { username: string } = await response.json();
        //const username: string = responseObject?.username || "?";
        // Assuming you have a function to handle storing the token
        // For example, you could use a state management library or localStorage
        // handleTokenStorage(token);

        // Redirect to the dashboard after successful login
        //navigates(`/dashboard?username=${username}`);
        navigates(`/dashboard`);
      } else {
        const responseData = await response.json();
        notify_failed(responseData.errMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img src={account} width={"30px"} height={"30px"} />
            <input
              className="input-box"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <img src={key} width={"30px"} height={"30px"} />
            <input
              className="input-box"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={handleTogglePassword}
              style={{ visibility: "hidden", border: "none", padding: 0 }}
            >
              {showPassword ? (
                <img
                  src={eye_close}
                  alt="Eye Close"
                  width="12px"
                  height="12px"
                  style={{ visibility: "visible" }}
                />
              ) : (
                <img
                  src={eye_open}
                  alt="Eye Open"
                  width="12px"
                  height="12px"
                  style={{ visibility: "visible" }}
                />
              )}
            </button>
          </div>
          <button type="submit">Login</button>
          <ToastContainer />
        </form>
      </div>

      <p className="grey">
        Dont Have Account yet?{" "}
        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
