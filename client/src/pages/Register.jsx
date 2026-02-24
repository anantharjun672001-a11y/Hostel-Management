import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        role:"resident"
    })

    const handleSubmit = async () =>{
        const res = await axios.post("http://localhost:5000/api/auth/register",data);
        localStorage.setItem("token",res.data.token);
    }

    return (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
            <div className='p-6  shadow-lg'>
                <input 
                    type="text"
                    placeholder='Name'
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input 
                    type="email"
                    placeholder='Email'
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input 
                    type="password"
                    placeholder='Password'
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <button onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;