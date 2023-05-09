import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );  
  const [loginState, setLoginState] = useState(fieldsState);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true; // Add this line to set the withCredentials property
      xhr.open('POST', 'http://localhost:8800/api/auth/login');
      xhr.setRequestHeader('Content-Type', 'application/json');
      const response = await axios.post("http://localhost:8800/api/auth/login", loginState, {
        withCredentials: true
      }); 

      if (response.status === 200) {
        setCurrentUser(response.data);
        const {token, redirectPath, accessToken, id, role } = response.data;
        localStorage.setItem("user", id);
        console.log('zalogowano na ' + id);
        navigate(redirectPath);
      } else if (response.status === 400 || response.status === 404) {
        setErr("Niepoprawny login lub hasło");
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <form
      className="mt-10 ml-20 mr-20 mb-10 space-y-6"
      action="#"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      {err && <p className="text-red-500">{err}</p>}
      <FormAction handleSubmit={handleSubmit} text="Zaloguj się" />
    </form>
  );
}
