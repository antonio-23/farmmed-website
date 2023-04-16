import { useState } from 'react';
import { ForgotFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';


const fields=ForgotFields;
let fieldsState={};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function forgot(){
  const [forgotState,setforgotState]=useState(fieldsState);
  const [err, setErr] = useState(null);

  const handleChange=(e)=>setforgotState({...forgotState,[e.target.id]:e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8800/api/auth/forgot", forgotState);
      if (response.status === 200) {
        setErr("Na podany adres została wysłana wiadomość");
      }
      else setErr("Niepoprawny email");
    } catch (err) {
      setErr(err.response.data);
    }
    console.log(err);
  };


    return(
      <form className="mt-10 ml-20 mr-20 mb-10 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={forgotState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}
            
          {err && <p className="text-red-500">{err}</p>}
          <FormAction handleSubmit={handleSubmit} text="Odzyskaj hasło" />
        </div>
      </form>
    )
}