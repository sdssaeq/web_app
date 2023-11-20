import { useEffect, useRef } from "react";
import { notify_success, ToastContainer } from "../components/toast-notify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface DashboardProps {
  username: string;
  password: string;
}

function Dashboard({ username }: DashboardProps) {
  const navigates = useNavigate();
  const initialized = useRef(false);
  // const Getusername: string | null = new URLSearchParams(location.search).get(
  //   "username"
  // );
  //const [username, setUsername] = useState("");
  const [cookies, removeCookie] = useCookies(["token"]);

  //ERROR COOKIE NOT RECEIVE FROM BACKEND
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      //console.log(username, password);
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigates("/login");
        }
      };

      // async function fetchData() {
      //   try {
      //     const response = await fetch(
      //       "https://api-satrio-efb719eaf55c.herokuapp.com/login",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           username: username,
      //           password: password,
      //         }),
      //       }
      //     );
      //     if (response.ok) {
      //       const data = await response.json();
      //       setCookie("token", data.token);
      //     } else {
      //       console.error("Error:", response.status, response.statusText);
      //     }
      //   } catch (error) {
      //     console.error("Fetch error:", error);
      //   }
      // }

      // fetchData();
      verifyCookie();

      if (username) {
        notify_success(`Hello ${username?.toUpperCase()} Welcome!`);
      }
    }
  }, [cookies.token, navigates, username]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigates("/");
  };

  if (username) {
    return (
      <>
        <div className="card">
          <h1>Hello {username?.toUpperCase()}</h1>
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
          <h1>Hello {username?.toUpperCase()}</h1>
          <button>Logout</button>
          <p className="grey">Simple Web App Login by Satrio Drajat</p>
        </div>
      </>
    );
  }
}

export default Dashboard;
