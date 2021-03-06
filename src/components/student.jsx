import React from 'react';
import Axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            result: "",
        }
        this.fetchEmployee = this.fetchEmployee.bind(this);
    }

    componentDidMount(){
        this.fetchEmployee();
    }


    fetchEmployee(){
        Axios.get("http://localhost:9090/students")
        .then(Response=>{this.setState({
            result:Response.data,
            error:""
        })})
    }
    render(){
        const {result} = this.state;
        return(
            <div>
            <div className="row">
              <div className="col-8 offset-2">
                <h3>Student Data:</h3>
                <br />
                <div style={{marginBottom:"40px"}}>
                  <button disabled={result.length===0} type="btn btn-success" onClick={()=>{downloadFile("http://localhost:9090/downloadExcel/student.xlsx")}}>Download Excel</button>
                </div>
                {result ? <Table list={result} /> : null}
              </div>
            </div>
          </div>
        )

    }
}

const handleRemoval=(itemId)=>{
  Axios.delete(`http://localhost:9090/deleteStudent/${itemId}`).then(function(response){
    console.log(response);
    window.location.reload(false);
  })
}

const downloadFile=(absoluteUrl)=> {
  var link = document.createElement('a');
  link.href = absoluteUrl;
  link.download = 'true';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Table = ({ list }) => (
    
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Student Roll Number</th>
          <th>Student Name</th>
          <th>Student Description</th>
          <th>Science Marks</th>
          <th>Language Marks</th>
          <th>Social Science Marks</th>
          <th>Student Percentage</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.rollNo}>
            <td>
              <span>{item.rollNo}</span>
            </td>
            <td>
              <span>{item.name}</span>
            </td>
            <td>
              <span>{item.desc}</span>
            </td>
            <td>
              <span>{item.scienceMks}</span>
            </td>
            <td>
              <span>{item.langMks}</span>
            </td>
            <td>
              <span>{item.sstMks}</span>
            </td>
            <td>
              <span>{item.perc}</span>
            </td>
            <td>
              <span>{item.grade}</span>
            </td>
            <td><button className="btn btn-danger" onClick={()=>{handleRemoval(item.rollNo)}}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  

export default student;