import { useEffect, useRef } from "react";
import { notify_success, ToastContainer } from "../components/toast-notify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../components/auth-contex";
function Dashboard() {
  const { username, password } = useAuth();
  const navigates = useNavigate();
  const initialized = useRef(false);
  const Getusername: string | null = new URLSearchParams(location.search).get(
    "username"
  );
  //const [username, setUsername] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  //ERROR COOKIE NOT RECEIVE FROM BACKEND
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const verifyCookie = async () => {
        if (!cookies.token) {
          navigates("/login");
        }
      };

      async function fetchData() {
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
            const data = await response.json();
            setCookie("token", data.token);
          } else {
            console.error("Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }

      fetchData();
      verifyCookie();

      if (Getusername) {
        notify_success(`Hello ${Getusername?.toUpperCase()} Welcome!`);
      }
    }
  }, [cookies.token, navigates, username]);

  const handleLogout = () => {
    removeCookie("token");
    navigates("/");
  };

  if (Getusername) {
    return (
      <>
        <div className="card">
          <h1>Hello {Getusername?.toUpperCase()}</h1>
          <button onClick={handleLogout}>Logout</button>
          <p className="grey">Simple Web App Login by Satrio Drajat</p>
          <ToastContainer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="card">
          <h1>Hello {Getusername?.toUpperCase()}</h1>
          <button>Logout</button>
          <p className="grey">Simple Web App Login by Satrio Drajat</p>
        </div>
      </>
    );
  }
}

export default Dashboard;
