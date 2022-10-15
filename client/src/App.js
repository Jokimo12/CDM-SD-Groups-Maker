import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Groups from './pages/Groups';
import Attendance from './pages/Attendance';
import Roster from './pages/Roster';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [rows, setRows] = useState([]);
    const [studentsFetched, setStudentsFetched] = useState(false);
    const [user, setUser] = useState('');

    return (
        <Routes>
            <Route path='/' element={<Login setUser={setUser} />} />
            <Route path='/signup' element={<Signup setUser={setUser} />}/>
            <Route path='/groups' element={<Groups user={user} setUser={setUser} rows={rows} studentsFetched={studentsFetched} setStudentsFetched={setStudentsFetched}/>}/>
            <Route path='/attendance' element={<Attendance user={user} setUser={setUser} rows={rows} studentsFetched={studentsFetched} setStudentsFetched={setStudentsFetched}/>}/>
            <Route path='/roster' element={<Roster user={user} setUser={setUser} rows={rows} setRows={setRows} studentsFetched={studentsFetched} setStudentsFetched={setStudentsFetched} />}/>
        </Routes>
    );
}

export default App;
