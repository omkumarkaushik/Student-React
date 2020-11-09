import Axios from 'axios';
import { Field, Form, Formik, useField } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './students.css';

const CustomTextInput = ({label,...props}) =>{
 
  const [field,meta] = useField(props);
 return(
 <React.Fragment>
   <label htmlFor = {props.id || props.name}>{label}</label>
   <input className="text-input" {...field} {...props}/>
   {meta.touched && meta.error ? (
     <h5 className = "error">
       {meta.error}
     </h5>):null
   }
 </React.Fragment>   
)}

class addStudents extends React.Component{

    render(){
        return(
          <React.Fragment className="form-group">
            <Formik
            initialValues={{
              rollNo:"",
              name:"",
              desc:"",
              scienceMks:"",
              sstMks:"",
              langMks:""
            }}
            validationSchema={Yup.object({
              rollNo:Yup.string().min(6,'Roll Number is of 6 digits').max(6,'Roll Number is of 6 digits').required('Roll Number is required'),
              name:Yup.string().min(3,'At least three characters').required('Name is required'),
              desc:Yup.string().required('Description is required'),
              scienceMks:Yup.string().required('Please Enter Marks').max(100,'Marks cannot be more than 100'),
              sstMks:Yup.string().required('Please Enter Marks').max(100,'Marks cannot be more than 100'),
              langMks:Yup.string().required('Please Enter Marks').max(100,'Marks cannot be more than 100'),
            })}
            onSubmit={(values,{ resetForm })=>{
              Axios.post("http://localhost:9090/addStudent",values).then(response=>{console.log(response.data)});
              resetForm();
            }}
            >
                {(props)=>(
                  <Form>
                    <h1>Add Student</h1>
                    <CustomTextInput label="Roll Number" name ="rollNo" type="text" placeholder="Your Roll Number"/><br/>
                    <CustomTextInput label="Name" name ="name" type="text" placeholder="Your Name"/><br/>
                    <CustomTextInput label="Your Description" name ="desc" type="text" placeholder="Your Description"/><br/>
                    <CustomTextInput label="Science Marks" name="scienceMks" type="text" placeholder="Enter marks in Science"/><br/>
                    <CustomTextInput label="Social Studies Marks" name="sstMks" type="text" placeholder="Enter marks in Social Studies"/><br/>
                    <CustomTextInput label="Languages Marks" name="langMks" type="text" placeholder="Enter marks in Langusges"/><br/>
                    <button className="btn btn-primary" type="submit">{props.isSubmitting?'Loading...': 'Submit'}</button>
                  </Form>
                )}
            </Formik>
          </React.Fragment>
        )
    }
}

export default addStudents;