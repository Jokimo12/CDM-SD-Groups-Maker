import './Signup.css';
import Title from '../components/Title'
import Input from '../components/Input';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateUser from '../hooks/useCreateUser';
export default function Signup(props) {
    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confPassword, setConfPassword] = useState('');

    const{status, mutate} = useCreateUser(email, password);

    const sendForm = async (event) => {
        event.preventDefault();

        if (password !== confPassword)
            return;

        mutate();
    
        
    }

    const passwordValidator = (value) => {
        return value === password;
    };

    useEffect(() => {
        if(status === 'success'){
            props.setUser(email);
            navigate("/roster");
        }
    }, [status]);

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

                    {status === 'loading' && 'Loading...'}

                    <Button type='submit' disabled={status === 'loading' || !(email && password && confPassword && password === confPassword)}>Sign Up</Button>

                    <Button link='/'>Back</Button>
                </form> 
            </div>
        </div>
    )
}

Signup.propTypes = {
    setUser: PropTypes.func.isRequired
}