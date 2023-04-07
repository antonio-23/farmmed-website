import { useState } from 'react';
import { ForgotFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=ForgotFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function forgot(){
  const [forgotState,setforgotState]=useState(fieldsState);

  const handleChange=(e)=>setforgotState({...forgotState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(forgotState)
    createAccount()
  }

  //handle forgot API Integration here
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
                            value={forgotState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Odzyskaj hasło" />
        </div>
      </form>
    )
}