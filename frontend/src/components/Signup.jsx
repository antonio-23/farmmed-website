import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios"


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setemail] = useState('');
  const [email2, setemail2] = useState('');
  const [password, setpaswword] = useState('');
  const [password2, setpaswword2] = useState('');

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

  // Dodaj funkcję auto data
  const handlePeselChange = (e) => {
    const pesel = e.target.value;
    if (isValidPesel(pesel) && pesel.length === 11){
    setErr(null);
    const year = pesel.substring(0, 2);
    const month = pesel.substring(2, 4);
    const day = pesel.substring(4, 6);
    const century = pesel.charAt(2);
    let birthyear;
    let birthmonth;
  
    switch (century) {
      case '0':
        birthyear = '19' + year;
        break;
      case '1':
        birthyear = '19' + year;
        break;
      case '2':
        birthyear = '20' + year;
        birthmonth = parseInt(month) - 20;
        break;
      case '3':
        birthyear = '20' + year;
        birthmonth = parseInt(month) - 20;
        break;
      default:
        console.log('Nieprawidłowy numer PESEL.');
        return;
    }
    const formattedDate = `${birthyear.toString()}-${birthmonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setDateOfBirth(formattedDate);
    }
    if (!isValidPesel(pesel) && pesel.length === 11){
    setErr('Nieprawidłowy numer PESEL');
    }
    setSignupState({...signupState,[e.target.id]:e.target.value}); 
  };

  const [err, setErr] = useState(null);
  
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
    setSignupState({...signupState,[e.target.id]:e.target.value})};  

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const pesel = signupState.PESEL;
    if (!isValidPesel(pesel)) {
      setErr('Nieprawidłowy numer PESEL');
      return;
    }
    if (email !== email2) {
      setErr("Adresy email nie są identyczne");
      return;
    } else if (password !== password2) {
      setErr("Hasła nie są identyczne");
      return;
    } else {
      setErr(null);
    }
    setSignupState({ ...signupState, date_of_birth: dateOfBirth });
        try{
            await axios.post("http://127.0.0.1:8800/api/auth/register", signupState)
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
                            value={(field.id === 'date_of_birth') ? dateOfBirth : signupState[field.id]}
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