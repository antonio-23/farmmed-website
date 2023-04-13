import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const [err, setErr] = useState(null);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit= async(e)=>{
    e.preventDefault()
        try{
            await axios.post("http://127.0.0.1:8800/api/auth/register", signupState)
        }catch(err){
            setErr(err.response.data);
        }
    console.log(err)
  }

  //handle Signup API Integration here
  const createAccount=()=>{

  }

    return(
      <form className="mt-10 ml-20 mr-20 mb-10 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Zarejestruj się" />
        </div>

         

      </form>
    )
}