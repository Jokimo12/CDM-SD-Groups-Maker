import './Login.css';
import Title from '../components/Title';
import Button from '../components/Button';
import Input from '../components/Input';
import PropTypes from 'prop-types';
import useAuthenticateUser from '../hooks/useAthenticateUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { status, data, error } = useAuthenticateUser(email, password);

    let passwordProps = {
        required: true,
        type: 'password',
        className: 'inputField',
        value: password,
        onChange: (value) => setPassword(value)
    }

    const login = async(event) => {
        event.preventDefault();

        try{
            if(status === 'success'){
                if(data.auth){
                    props.setUser(email);
                    navigate("/roster");
                } else {
                    passwordProps = {...passwordProps, message: 'Wrong Password'};
                }
            } else if(status === 'error') {
                setEmail('');
                setPassword('');
            }

        } catch(e) {
            console.log(e);
        }
    }

    return(
        <div className='login'>
            <Title/>

            <div className='description'>
                A Fast Way to Build Groups in a Classroom 
            </div>

            <div className='formContainer'>
                <form className='form' onSubmit={login}>
                    <label>Email</label><br/>
                    <Input required = {true} type='email' className='inputField' value={email} onChange={(value) => setEmail(value)} /><br/>
                    <label>Password</label><br/>
                    <Input {...passwordProps} /><br/>

                    <Button link='/'>
                        Forgot Password?
                    </Button>
                    
                    <Button link='/signup'>Sign Up</Button>

                    <Button type='submit' disabled={!(email && password)}>Log In</Button>
                </form> 
            </div>
        </div>
    );
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired
}