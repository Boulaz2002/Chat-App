import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg"
import FormContainer from '../components/FormContainer';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
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
            console.log("in validation", registerRoute, username,email,password)
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            } );
            if(data.status === true){
                toast.info("User Register");
                
                setTimeout(()=>{navigate("/")}, 6000) 

            }
            toast.error(data.msg,toastOption)
       }
    }

    const handleValidation = ()=>{
        
        if(password!==confirmPassword){
            toast.error("password and confirm",toastOption)
            return false
        }
        else if(username.length<3){
            toast.error("Username must be at least 3 characters",toastOption)
            return false
        }
        else if(password.length<8){
            toast.error("password must be at least 8 characters",toastOption)
            return false
        }
        else if(email===""){
            toast.error("email can not be empty",toastOption)
            return false
        }
        return true
    }

    const handleChange = (event)=>{
        setValues({ ...values,[event.target.name]:event.target.value})
    }
    const {password, confirmPassword, username, email } = values;
    
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
                    type="email" 
                    placeholder='Email' 
                    name='email' 
                    onChange={e=>handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name='password' 
                    onChange={e=>handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name='confirmPassword' 
                    onChange={e=>handleChange(e)}
                />
                <button type='submit'>Create User</button>
                <span>Already have an account ? <Link to="/Login">Login</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

