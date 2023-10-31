import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import TopBar from '../components/TopBar';
import './pages.css'
import { useNavigate } from "react-router";


const Register = () => {
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault()
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }
    try{
      await axios.post("/auth/register", user)
      navigate('/login')
    }catch(err){
    console.log(err)
    }
  }

    return (
      <div className='top-bar'>
        <TopBar/>
        <div className='form-container'>
            <div className='form-wrapper'>
                <h2 className='title'>REGISTER</h2>
                <form className='reg-form' onSubmit={register}>
                  <label htmlFor="name">
                    <input
                        type="text"
                        name='name'
                        placeholder='USERNAME'
                        required
                    />
                    </label>
                    <label htmlFor="email">
                    <input
                        type="email"
                        name='email'
                        placeholder='EMAIL'
                        required
                    />
                    </label>
                    <label htmlFor="password">
                    <input
                        type="password"
                        name='password'
                        placeholder='******'
                        required
                    />
                    </label>
                    <button className='signup-button' type='submit'>SIGN UP</button>
                </form>

                <p className='signup-login'>Already have an account?<Link to="/login"> Login</Link></p>

            </div>
        </div>
        </div>
    )
}

export default Register
