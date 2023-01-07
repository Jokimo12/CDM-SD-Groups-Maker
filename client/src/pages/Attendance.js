import Navbar from '../components/Navbar';
import './Attendance.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import useGetStudents from '../hooks/useGetStudents';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    { field: 'points', headerName: 'Points', width: 110 },
];

export default function Attendance(props) {
    const navigate = useNavigate();

    const {status, data} = useGetStudents(props.user);

    useEffect(() => {
        if(props.user === '') {
            navigate("/");
        } 
    }, []);

    return(
        <div>
            <Navbar setUser={props.setUser} />
            <div className='attendanceContainer'>
                {status === 'loading' && 'Loading!'}

                {status === 'error' && 'Error!'}

                {status === 'success' && <Box sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                        rows={data.students}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>}
            </div>
        </div>
    );
}

Attendance.propTypes = {
    user: PropTypes.string.isRequired
}