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

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    { field: 'points', headerName: 'Points', width: 110 },
];

export default function Roster(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setID] = useState(props.rows.length);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState(""); 
    const [grade, setGrade] = useState("");
    const [points, setPoints] = useState("");

    const navigate = useNavigate();

    const clearForm = () => {
        setIsOpen(false);
        setFirst('');
        setLast('');
        setGrade('');
        setPoints('');
    }

    const submit = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch("/newStudent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: first,
                    lastName: last,
                    grade: grade,
                    points: points,
                    user: props.user
                })
            })
            if(response.status === 200){
                setID((prevID) => prevID+1);
                props.setRows(prevRows => [...prevRows, {
                    id: id, 
                    firstName: first,
                    lastName: last,
                    grade: grade,
                    points: points
                }]);
                clearForm();
            }
        } catch(e) {
            console.log(e);
        }
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

                setID(data.students.length);
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

    console.log('props.rows', props.rows)
    console.log('id', id);
    return(
        <div>
            <Navbar setUser={props.setUser} setStudentsFetched={props.setStudentsFetched} />

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

                            <input type='submit' value='Submit' className='button tight' />
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

                <Box sx={{ height: 400, width: '90%' }}>
                    <DataGrid
                        rows={props.rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[55]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </div>
        </div>
    );
}

Roster.propTypes = {
    user: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired,
    studentsFetched: PropTypes.bool.isRequired,
    setStudentsFetched: PropTypes.func.isRequired
}