import { useEffect,useRef} from 'react';
import { notify_success, ToastContainer } from "../components/toast-notify";
import { useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Dashboard() {
  const navigates = useNavigate();
  const initialized = useRef(false)
  const Getusername: string | null = new URLSearchParams(location.search).get('username');
  //const [username, setUsername] = useState("");
  const [cookies,setCookie] = useCookies(['token']);
  
  //ERROR COOKIE NOT RECEIVE FROM BACKEND
  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true
        async function fetchData() {
          try {
            const response = await fetch("https://api-satrio-efb719eaf55c.herokuapp.com/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: 'satrio',
                password: '1234',
              }),
            });
        
            if (response.ok) {
              const data = await response.json();
              setCookie('token',data.token);
              //console.log("Response data:", data);
              //console.log("COOKIE", cookies);
            } else {
              console.error("Error:", response.status, response.statusText);
            }
          } catch (error) {
            console.error("Fetch error:", error);
          }
        }
        
        // Call the async function
        fetchData();
        if (!cookies.token) {
           navigates('/login');
       }
        

        if (Getusername){
          notify_success(`Hello ${Getusername?.toUpperCase()} Welcome!`);
        }
        const verifyCookie = async () => {
          if (!cookies.token) {
            navigates("/login");
          }}
          
          
        //   // const data = await loginReq.json();
        //   // console.log(data)
        //   // setUsername(data.user);
        //   
        //   //return data.status ? notify_success(`Hello ${data.user}`) : (cookies.remove('token'), navigates("/login"));
        // };
        verifyCookie();
    }
  }, [cookies.token,navigates, Getusername]);

  const handleLogout = () => {
    //cookies.remove('token');
    navigates("/");
  };

  if (Getusername) {
    return (
      <>
        <div className="card">
          <h1>Hello {Getusername?.toUpperCase()}</h1>
          <button onClick={handleLogout}>
            Logout
          </button>
          <p className="grey">
            Simple Web App Login by Satrio Drajat
          </p>
          <ToastContainer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="card">
          <h1>Hello {Getusername?.toUpperCase()}</h1>
          <button>
            Logout
          </button>
          <p className="grey">
            Simple Web App Login by Satrio Drajat
          </p>
        </div>
      </>
    );
  }
}

export default Dashboard;