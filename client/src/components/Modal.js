import { Modal as MuiModal, Box } from "@mui/material";
import PropTypes from 'prop-types';
import './Modal.css';

export default function Modal(props) {
    return(
        <MuiModal
            open={props.open}
            onClose={props.onClose}
        >
            <Box className='box'>
                {props.children}
            </Box>
        </MuiModal>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}