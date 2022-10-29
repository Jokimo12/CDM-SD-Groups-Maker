import './Signup.css';
import Title from '../components/Title'
import Input from '../components/Input';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confPassword, setConfPassword] = useState('');

    const sendForm = async (event) => {
        event.preventDefault();

        if (password !== confPassword)
            return;

        try {
            const response = await fetch("/newUser", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.status === 200) {
                props.setUser(email);
                navigate("/roster");
            }

        } catch (err) {
            console.log("error!");
        }
    }

    const passwordValidator = (value) => {
        return value === password;
    };

    return(
        <div className='signup'>
            <Title/>

            <div className='description'>
                A Fast Way to Build Groups in a Classroom 
            </div>
            
            <div className='formContainer'>
                 <form className='form' onSubmit={sendForm}>
                    <label>Email</label><br/>
                    <Input required = {true} type='email' className='inputField' value={email} onChange={(value) => setEmail(value)} /><br/>
                    <label>Password</label><br/>
                    <Input required = {true} type='password' className='inputField' value={password} onChange={(value) => setPassword(value)} /><br/>
                    <label>Confirm Password</label><br/>
                    <Input required = {true} type='password' className='inputField' value={confPassword} onChange={(value) => setConfPassword(value)} validator = {passwordValidator} message = "passwords must match" /><br/>

                    <Button type='submit' disabled={!(email && password && confPassword && password === confPassword)}>Sign Up</Button>

                    <Button link='/'>Back</Button>
                </form> 
            </div>
        </div>
    )
}

Signup.propTypes = {
    setUser: PropTypes.func.isRequired
}