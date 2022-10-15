import './Group.css';
import PropTypes from 'prop-types';

export default function Group(props) {
    return(
        <div className='group'>
            {props.names.map(ele => <div className='name'>{ele}</div>)}
        </div>
    )
}

Group.propTypes = {
    names: PropTypes.array.isRequired
}