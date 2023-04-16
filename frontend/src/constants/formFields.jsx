const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Hasło"   
    }
]

const signupFields=[
    {
        labelText:"Name",
        labelFor:"name",
        id:"first_name",
        name:"first_name",
        type:"name",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Imię"   
    },
    {
        labelText:"Last_name",
        labelFor:"last_name",
        id:"last_name",
        name:"last_name",
        type:"name",
        autoComplete:"last_name",
        isRequired:true,
        placeholder:"Nazwisko"   
    },
    {
        labelText:"PESEL",
        labelFor:"PESEL",
        id:"PESEL",
        name:"PESEL",
        type:"number",
        autoComplete:"PESEL",
        isRequired:true,
        placeholder:"PESEL"   
    },
    {
        labelText:"Date_of_birth",
        labelFor:"date_of_birth",
        id:"date_of_birth",
        name:"date_of_birth",
        type:"date",
        autoComplete:"date_of_birth",
        isRequired:true,
        placeholder:"Data urodzenia"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email"   
    },
    {
        labelText:"Confirm Email address",
        labelFor:"confirm-email-address",
        id:"confirm-email-address",
        name:"confirm-email",
        type:"email",
        autoComplete:"confirm-email",
        isRequired:true,
        placeholder:"Powtórz email"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Hasło"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Powtórz hasło"   
    }
]

const ForgotFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email"    
    }
]

export {loginFields,signupFields,ForgotFields}