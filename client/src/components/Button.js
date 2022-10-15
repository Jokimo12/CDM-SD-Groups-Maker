import './Button.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Button(props) {
    if(props.link){
        return(
            <Link to={props.link} className='buttonLink'>
                <button onClick={props.onClick} className='button' type={props.type}>
                    {props.children}
                </button>
            </Link>
        );
    }

    return(
        <button onClick={props.onClick} className={`button wide ${props.styles}`} type={props.type}>
            {props.children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    link: PropTypes.string,
    styles: PropTypes.string,
    type: PropTypes.string
}