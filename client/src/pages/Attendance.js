import Navbar from '../components/Navbar';
import './Attendance.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
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

    useEffect(() => {
        async function getNames() {
            try{
                const response = await fetch("/getStudents", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: props.user
                    })
                })

                const data = await response.json();
                
                props.setRows(data.students);
            } catch(e) {
                console.log(e);
            }
        }

        if(props.user === '') {
            navigate("/");
        
        } else if(!props.studentsFetched){
            getNames();
            props.setStudentsFetched(true);
        }
    }, []);

    return(
        <div>
            <Navbar setUser={props.setUser} setStudentsFetched={props.setStudentsFetched} />
            <div className='attendanceContainer'>
                <Box sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                        rows={props.rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </div>
        </div>
    );
}

Attendance.propTypes = {
    user: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    studentsFetched: PropTypes.bool.isRequired,
    setStudentsFetched: PropTypes.func.isRequired
}