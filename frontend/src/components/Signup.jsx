import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";

const fields=signupFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [email, setemail] = useState('');
  const [email2, setemail2] = useState('');
  const [password, setpaswword] = useState('');
  const [password2, setpaswword2] = useState('');
  const navigate = useNavigate();

  const isValidPesel = (pesel) => {
    if (!/^[0-9]{11}$/.test(pesel)) return false;

    const digits = pesel.split('').map(Number);

    const checksum =
      (1 * digits[0] + 3 * digits[1] + 7 * digits[2] + 9 * digits[3] + 1 * digits[4] + 3 * digits[5] + 7 * digits[6] + 9 * digits[7] + 1 * digits[8] + 3 * digits[9]) % 10;

    if (checksum === 0) {
      return digits[10] === 0;
    } else {
      return digits[10] === (10 - checksum);
    }
  }

  // Funkcja autoDate
const autoDate = (pesel) => {
  let year = parseInt(pesel.substring(0,2));
  let month = parseInt(pesel.substring(2,4));
  let day = parseInt(pesel.substring(4,6));
  if (month > 80) {
    year += 1800;
    month -= 80;
  } else if (month > 60) {
    year += 2200;
    month -= 60;
  } else if (month > 40) {
    year += 2100;
    month -= 40;
  } else if (month > 20) {
    year += 2000;
    month -= 20;
  } else {
    year += 1900;
  }
  const dateOfBirth = new Date(year, month-1, day+1).toISOString().substring(0,10);
  return dateOfBirth;
};


  // Dodaj funkcję auto data
  const handlePeselChange = (e) => {
    const pesel = e.target.value;
    if (isValidPesel(pesel) && pesel.length === 11){
    setErr(null);
    const dateOfBirth = autoDate(pesel);
    setSignupState({...signupState,[e.target.id]:e.target.value, date_of_birth: dateOfBirth});
    }else if (!isValidPesel(pesel) && pesel.length === 11){
    setErr('Nieprawidłowy numer PESEL');
    }else{
    setSignupState({...signupState,[e.target.id]:e.target.value});
    }
    };  

  const [err, setErr] = useState(null);
  fieldsState={...fieldsState, date_of_birth: ''};

  const handleChange=(e)=>{
    const { name, value } = e.target;
    if (name === 'email') {
      setemail(value);
    } else if (name === 'confirm-email') {
      setemail2(value);
    }
    if (name === 'password') {
      setpaswword(value);
    } else if (name === 'confirm-password') {
      setpaswword2(value);
    }
    setSignupState({...signupState,[e.target.id]:e.target.value})
  };
    


  const handleSubmit= async(e)=>{
    e.preventDefault()
    const pesel = signupState.PESEL;
    if (!isValidPesel(pesel)) {
      setErr('Nieprawidłowy numer PESEL');
      return;
    }
    console.log(e.target.first_name);
    console.log(e.target.last_name);
    console.log(e.target.PESEL);
    console.log(e.target.date_of_birth);
    console.log(e.target.email);
    console.log(e.target['confirm-email-address']);
    console.log(e.target.password);
    if (email !== email2) {
      setErr("Adresy email nie są identyczne");
      return;
    } else if (password !== password2) {
      setErr("Hasła nie są identyczne");
      return;
    } else {
      setErr(null);
    }
    setSignupState({ ...signupState,});
        try{
          await axios.post("http://127.0.0.1:8800/api/auth/register", {...signupState, date_of_birth: autoDate(signupState.PESEL)});
          navigate("/login");
        }catch(err){
            setErr(err.response.data);
        }
    console.log(err)
  }

    return(
      <form className="mt-10 ml-20 mr-20 mb-10 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={(field.id === 'PESEL') ? handlePeselChange : handleChange}
                            value={signupState[field.id]}
                            //value={(signupState[field.id])}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />

                )
            }
          {err && <p className="text-red-500">{err}</p>}
          <FormAction handleSubmit={handleSubmit} text="Zarejestruj się" />
        </div>
      </form>
    )
}