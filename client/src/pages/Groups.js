import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Group from '../components/Group';
import PropTypes from 'prop-types';
import './Groups.css';
import useGetStudents from '../hooks/useGetStudents';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Groups(props) {
    const [numGroups, setNumGroups] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState([{id: 1, names: []}]);
    const [selectedGroup, setSelectedGroup] = useState(1);
    const [selectedNames, setSelectedNames] = useState([]);

    const navigate = useNavigate();

    const {status, data} = useGetStudents(props.user);

    const addGroup = () => {
        if(numGroups < 5){
            setNumGroups(newNum => newNum + 1);
            setGroups((prevGroups) => [...prevGroups, {id: numGroups+1, names: []}]);
        }
    }

    const deleteGroup = () => {
        if(numGroups > 1) {
            setNumGroups(newNum => newNum - 1);
            setGroups((prevGroups) => {
                const groupsCopy = [...prevGroups];
                groupsCopy.pop();
                return groupsCopy;
            })
        }
    }

    const clickHandler = (num) => {
        if(selectedNames.includes(num)){
            setSelectedNames(prev => prev.filter(ele => ele !== num));
        } else {
            setSelectedNames(prev => [...prev, num]);
        }
    }
    
    const groupsButtonsMapFunc = (ele) => {
        const groupButtonProps = {
            onClick: () => setSelectedGroup(ele.id),
            key: ele.id,
            styles: ele.id === selectedGroup ? 'medium spaced selected' : 'medium spaced'
        };
        return <Button {...groupButtonProps}>{`Group ${ele.id}`}</Button>;
    }
    
    const namesMapFunc = (ele) => {
        const namesButtonProps = {
            onClick: () => clickHandler(ele.id),
            key: ele.id,
            styles: selectedNames.includes(ele.id) ? 'names selected' : 'names'
        };
        return <Button {...namesButtonProps}>{`${ele.firstName} ${ele.lastName}`}</Button>
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }  

    const shuffle = () => {        
        let newGroups = [];
        let randomIndices = [];

        for(let i = 0; i < groups.length; i++){
            newGroups[i] = {id: i+1, names:[]};
        }

        for(let i = 0; i < data.students.length; i++){
            let randNum = getRandomInt(data.students.length-1);
            while(randomIndices.find(ele => ele === randNum)){
                randNum = getRandomInt(data.students.length-1);
            }
            randomIndices.push(randNum);
        }

        let student;
        while(randomIndices.length > 0){
            for(let i = 0; i < groups.length; i++){
                student = `${data.students[randomIndices[randomIndices.length-1]].firstName} ${data.students[randomIndices[randomIndices.length-1]].lastName}`;
                newGroups[i].names.push(student);
                randomIndices.pop();
            }
        }
        
        setGroups(newGroups);
    }

    const submitHandler = () => {
        setGroups((prevGroups) => {
            
            prevGroups[selectedGroup-1].names = selectedNames.map(ele => `${data.students[ele].firstName} ${data.students[ele].lastName}`);
            return prevGroups;
        });

        setSelectedGroup(1);
        setSelectedNames([]);

        setIsOpen(false);
    }

    useEffect(() => {
        if(props.user === '') {
            navigate("/");
        }
    }, []);

    return(
        <div>
            <Navbar setUser={props.setUser} />

            {status === 'loading' && 'Loading!'}

            {status === 'error' && 'Error!'}

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className='namesContainer'>
                    <div className='groupModalButtons'>
                        {groups.map(groupsButtonsMapFunc)}
                    </div>

                    <div className='namesModalButtons'>
                        {status === 'loading' && 'Loading!'}

                        {status === 'error' && 'Error!'}

                        {status === 'success' && data.students.map(namesMapFunc)}
                    </div>

                    <div className='controlModalButtons'>
                        <Button styles='tight spaced' onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>

                        <Button styles='tight spaced' onClick={submitHandler}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
            
            <div className='groups'>
                <Button styles='tight' onClick={shuffle}>
                    Shuffle Groups
                </Button>

                <Button styles='tight' onClick={() => setIsOpen(true)}>
                    Input Names
                </Button>

                <div className='groupsButtonsContainer'>
                    Number of Groups: {numGroups}
                    <div className='groupButtons'>
                        <Button onClick={deleteGroup} styles='round spaced'>
                            -
                        </Button>

                        <Button onClick={addGroup} styles='round spaced'>
                            +
                        </Button>
                    </div>
                </div>
            </div>

            <div className='groupsContainer'>
                {groups.map(ele => <Group key={ele.id} names={ele.names} />)}
            </div>
        </div>
    );
}

Groups.propTypes = {
    user: PropTypes.string.isRequired
}