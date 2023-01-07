import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import './Roster.css';
import Modal from '../components/Modal';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useGetStudents from '../hooks/useGetStudents';
import useCreateStudent from '../hooks/useCreateStudent';

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    { field: 'points', headerName: 'Points', width: 110 },
];

export default function Roster(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState(""); 
    const [grade, setGrade] = useState("");
    const [points, setPoints] = useState("");

    const navigate = useNavigate();

    const{status, data} = useGetStudents(props.user);

    console.log('data', data)

    const studentInfo = {
        firstName: first,
        lastName: last,
        grade: grade,
        points: points,
        user: props.user
    };

    const{mutate: createStudent} = useCreateStudent(studentInfo);

    useEffect(() => {
      if (status === 'success') {
        //setID(data.students.length);
      }
    }, [status])

    const clearForm = () => {
        setIsOpen(false);
        setFirst('');
        setLast('');
        setGrade('');
        setPoints('');
    }

    const submit = async(event) => {
        event.preventDefault();         
        createStudent();
        //setID((prevID) => prevID+1);
        clearForm()
    
    }

    const onFirstNameChange = (value) => {
        setFirst(value);
    };

    const onLastNameChange = (value) => {
        setLast(value);
    };

    const onGradeNameChange = (value) => {
        setGrade(value);
    };

    const onPointsNameChange = (value) => {
        setPoints(value);
    };

    const gradeValidator = (value) => {
        const regex = /[aA-zZ]+/g;
        const isInvalid = value.match(regex);

        if(isInvalid || parseInt(value) < 7 || parseInt(value) > 12){
            return false;
        } else {
            return true;
        }
    }

    const pointsValidator = (value) => {
        const regex = /[aA-zZ]+/g;
        const isInvalid = value.match(regex);

        if(isInvalid){
            return false;
        } else {
            return true;
        }
    }

    // const getNames = async() => {
    //     try{
    //         const response = await fetch("/getStudents", {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 user: "John"
    //             })
    //         })

    //         props.setRows(response.status.studentList);
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }

    //const {setRows} = props

    useEffect(() => {        
        if(props.user === '') {
            navigate("/");
        }

    }, []);

    return(
        <div>
            <Navbar setUser={props.setUser} />

            <Modal
                open={isOpen}
                onClose={clearForm}
            >
                <div className='formContainer'>
                    <span>Add New Member</span>
                    <form className='form' onSubmit={submit}>
                        <label>First Name</label><br/>
                        <Input type='text' onChange = {onFirstNameChange} value={first} /><br/>
                        <label>Last Name</label><br/>
                        <Input type='text' onChange = {onLastNameChange} value={last} /><br/>
                        <label>Grade</label><br/>
                        <Input type='text' onChange = {onGradeNameChange} validator={gradeValidator} message = "Must be a number between 7 and 12" value={grade} /><br/>
                        <label>Points</label><br/>
                        <Input type='text' onChange = {onPointsNameChange} validator={pointsValidator} message = "Must be a number" value={points} /><br/>
                        <div className='buttonContainer'>
                            <Button styles='spaced tight' onClick={clearForm}>
                                Cancel
                            </Button>
                            
                            <input type='submit' value='Submit' className='button tight' disabled={!(first && last && grade && points)} />
                        </div>  
                    </form>  
                </div>
            </Modal>

            <div className='roster'>
                <Button styles='tight' onClick={() => {
                    setIsOpen(true);
                }}>
                    Add Member
                </Button>

                {status === 'loading' && 'Loading!'}

                {status === 'error' && 'Error!'}

                {status === 'success' && <Box sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                        rows={data.students}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[55]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>}
            </div>
        </div>
    );
}

Roster.propTypes = {
    user: PropTypes.string.isRequired
}