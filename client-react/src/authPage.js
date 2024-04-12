import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // Track login/signup form

  // Regular expression for alphanumeric characters only
  const isValidUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);

  // Regular expression for email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toggleForm = () => {
    const card = document.querySelector(".card");
    card.classList.toggle("show-signup");
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidUsername(username)) {
      alert("Please enter a valid username (alphanumeric characters only).");
      return;
    }

    if (secret.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (isLoginForm) {
      // Handle login
      axios
        .post("https://web-tech-final.onrender.com/login", { username, secret })
        .then((r) => props.onAuth({ ...r.data, secret }))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    } else {

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Handle signup
      axios
        .post("https://web-tech-final.onrender.com/signup", {
          username,
          secret,
          email,
          first_name,
          last_name,
        })
        .then((r) => props.onAuth({ ...r.data, secret }))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    }
  };

  return (
    <div className="login-page">
      <div className={`card ${isLoginForm ? "" : "show-signup"}`}>
        <form onSubmit={handleSubmit}>
          <div className="title">
            {isLoginForm ? "Login to Cliq!" : "Create a Cliq account"}
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          {!isLoginForm && (
            <>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <button type="submit">{isLoginForm ? "LOG IN" : "SIGN UP"}</button>
        </form>
        <button className="toggle-button" onClick={toggleForm}>
          {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>

      <style jsx>{`
        .login-page {
          width: 100vw;
          height: 100vh;
          padding-top: 6vw;
          background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          width: 300px;
          text-align: center;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 22px;
          color: #333;
          font-weight: 700;
          margin-bottom: 20px;
        }

        input {
          width: calc(100% - 20px); /* Adjusted width for proper padding */
          margin-top: 12px;
          padding: 10px;
          background-color: #f5f5f5;
          outline: none;
          border: none;
          border-radius: 20px;
          transition: background-color 0.3s ease;
        }

        button {
          margin-top: 20px;
          width: calc(100% - 24px); /* Adjusted width for proper padding */
          padding: 12px;
          background-color: #6c63ff;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #544dff;
        }

        .toggle-button {
          background-color: transparent;
          border: none;
          color: #6c63ff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: color 0.3s ease;
          margin-top: 10px;
        }

        .toggle-button:hover {
          color: #f5f5f5;
        }

        .card.show-signup {
          transform: translateX(-100%);
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
