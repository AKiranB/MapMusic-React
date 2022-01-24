import React, { useEffect } from 'react'
import { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import axios from 'axios'
import { response } from 'express';


export default function Signup() {

    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const apiTest = () => {
            axios
                .get("/auth/signup")
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        apiTest()
    }, [])

    // const signup = () => {
    //     return axios.post('/auth/signup', { name, password, email })
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/signup', { name, password, email })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    return (

        // <div >
        //     <h3>Sign up</h3>
        //     <form onSubmit={handleSubmit} className='class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"'>
        //         <input
        //             type="text"
        //             name="username"
        //             value={name}
        //             onChange={e => setUsername(e.target.value)}
        //             className="block text-gray-700 text-sm font-bold mb-2"
        //         />
        //         <input
        //             type="password"
        //             name="password"
        //             value={password}
        //             onChange={e => setPassword(e.target.value)}
        //             className="block text-gray-700 text-sm font-bold mb-2"

        //         />
        //         <input
        //             type="email"
        //             name="email"
        //             value={email}
        //             onChange={e => setEmail(e.target.value)}
        //             className='Input'

        //         />
        //         <button type="submit">Create Account </button>
        //         {message && (
        //             <h3>{message}</h3>

        //         )}
        //         <p>Already a user? <a href='/login'>- <u>Log In</u></a></p>
        //         {error && (
        //             <h3>{error}</h3>

        //         )}
        //     </form>

        <div className="flex flex-col justify-center items-center mt-60">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded w-80 px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={name}
                        onChange={e => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Username" />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="******************" />
                </div>

                <div className="flex items-center justify-center items-center ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Create Account </button >
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a> */}
                </div>
            </form>
        </div>

    )

};

