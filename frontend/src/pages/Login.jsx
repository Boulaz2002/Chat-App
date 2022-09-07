import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg"
import FormContainer from '../components/FormContainer';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {
  const [buttonActive, setButtonActive] = useState("")
    
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username:'',
        password:''
    })

    const {password, username} = values;

    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme:'dark',
    };
        
    const handleSubmit = async (event) =>{
        
        event.preventDefault();
        if(handleValidation()){
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            } );
            if(data.status === true){
                setButtonActive("disabled");
                toast.info(`Welcome ${username}`);
                
                setTimeout(()=>{navigate("/")}, 6000) 

            }
            toast.error(data.msg,toastOption)
       }
    }

    const handleValidation = ()=>{
        
        if(password===""){
            toast.error("Password and Username are Require!!!",toastOption)
            return false
        }
        else if(username===""){
            toast.error("Password and Username are Require!!!",toastOption)
            return false
        }
        return true
    }

    const handleChange = (event)=>{
        setValues({ ...values,[event.target.name]:event.target.value})
    }
    
    
  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>Snappy</h1>
                </div>
                <input 
                    type="text" 
                    placeholder='Username' 
                    name='username' 
                    onChange={e=>handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name='password' 
                    onChange={e=>handleChange(e)}
                />
                <button type='submit' disabled= {`${buttonActive}`}>Login</button>
                <span>Don't have an account ? <Link to="/register">Register</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

