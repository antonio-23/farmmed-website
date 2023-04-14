import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://127.0.0.1:8800/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginState),
    });
    const data = await response.json();
    localStorage.setItem("accessToken", data.token);
    if (response.status === 400 || response.status === 404) {
      setErr("Niepoprawny login lub hasło");
    } else{
      navigate("/");
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
