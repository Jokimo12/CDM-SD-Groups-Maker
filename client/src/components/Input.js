import './Input.css';
import Warning from "./Warning";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function Input (props) {
    const {type, onChange, message, required, validator, value} = props;
    const [valid, setValid] = useState(true);

    const onChangeHandler = (event) => {
        const { value } = event.target;

        onChange(value);

        if (validator) {    
            if (validator(value))
                setValid(true);
            else
                setValid(false);
        }
    }

    const inputProps = {
        className: valid ? "input" : "input invalid",
        onChange: onChangeHandler,
        type: type,
        value: value
    };

    if (required) {
        return(
            <>
                <input required {...inputProps}></input>
                {!valid && <Warning message = {message}/>}
            </>
        );
    }

    return(
        <>
            <input {...inputProps}></input>
            {!valid && <Warning message = {message}/>}
        </>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    message: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}