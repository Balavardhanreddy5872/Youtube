import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reset from "./Reset";

function Signin(prop) {
  const backendURL = "https://backend-k9bc.onrender.com";
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" }); // Initialize with empty strings
  const [showReset, setShowReset] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (prop.close === true) {
      setShowReset(false);
    }
  }, [prop.close]);

  useEffect(() => {
    if (prop.switch === false) {
      setShowReset(false);
    }
  }, [prop.switch]);

  // TOASTS
  const LoginNotify = () =>
    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const InvalidNotify = () =>
    toast.error("Invalid Credentials!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const ErrorNotify = () =>
    toast.error("Input fields can't be empty.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const NoUserNotify = () =>
    toast.error("User doesn't exist.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const handleInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      ErrorNotify();
      return;
    }
    try {
      const response = await fetch(`${backendURL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, token, user } = await response.json();

      if (message === "LOGIN SUCCESSFUL") {
        LoginNotify();
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user)); 

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (message === "INVALID CREDENTIALS") {
        InvalidNotify();
      } else if (message === "USER DOESN'T EXIST") {
        NoUserNotify();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="above-data"
        style={{ display: showReset ? "none" : "block" }}
      >
        <p className="signup-head">Login to Your Account</p>
        <p className="signup-desc">
          Stay Connected - Stay Entertained. Step into the World of YouTube, Join the YouTube Community
        </p>
      </div>
      <div
        className="signup-form"
        style={{ display: showReset ? "none" : "flex" }}
      >
        <form onSubmit={SubmitData}>
          <input
            type="email"
            name="email"
            className={theme ? "email" : "email email-light light-mode text-light-mode"}
            placeholder="Email Address"
            onChange={handleInputs}
            required
          />
          <input
            type="password"
            name="password"
            className={theme ? "password" : "password email-light light-mode text-light-mode"}
            placeholder="Passcode"
            onChange={handleInputs}
            required
          />
          <p
            className={theme ? "forgot-password" : "forgot-password text-light-mode"}
            onClick={() => setShowReset(true)}
          >
            Forgot password?
          </p>
          <button
            className={theme ? "signup-btn" : "signup-btn signin-btn-light"}
            type="submit"
          >
            Login to Your Account
          </button>
        </form>
      </div>
      <div
        className="password-reset"
        style={{ display: showReset ? "block" : "none" }}
      >
        <Reset />
      </div>
    </>
  );
}

export default Signin;
