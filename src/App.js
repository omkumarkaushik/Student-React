import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Student from './components/student';
import AddStudents from './components/addStudents';

function App() {
  return (
  <div className="App">
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">Our School</div>
            <ul className="navbar-nav mr-auto">
              <li><Link className="nav-link" to="/students">Students</Link></li>
              <li><Link className="nav-link" to="/addStudents">Add Students</Link></li>
            </ul>
        </nav>
        <Route path="/students" component={Student}></Route>
        <Route path="/addStudents" component={AddStudents}></Route>
    </Router>
  </div>  
  );
}

export default App;
