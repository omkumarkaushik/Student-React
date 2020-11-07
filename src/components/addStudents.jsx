import Axios from 'axios';
import { Field, Form, Formik, useField } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const CustomTextInput = ({label,...props}) =>{
 
  const [field,meta] = useField(props);
 return(
 <React.Fragment>
   <label htmlFor = {props.id || props.name}>{label}</label>
   <input className="text-input" {...field} {...props}/>
   {meta.touched && meta.error ? (
     <div className = "error">
       {meta.error}
     </div>):null
   }
 </React.Fragment>   
)}

class addStudents extends React.Component{

    render(){
        return(
          <div className="form-group">
            <Formik
            initialValues={{
              rollNo:"",
              name:"",
              desc:""
            }}
            validationSchema={Yup.object({
              rollNo:Yup.string().min(6,'Roll Number is of 6 digits').max(6,'Roll Number is of 6 digits').required('Roll Number is required'),
              name:Yup.string().min(3,'At least three characters').required('Name is required'),
              desc:Yup.string().required('Description is required')
            })}
            onSubmit={(values,{ resetForm })=>{
              Axios.post("http://localhost:9090/addStudent",values).then(response=>{console.log(response.data)});
              resetForm();
            }}
            >
                {props=>(
                  <Form>
                    <h1>Add Student</h1>
                    <CustomTextInput label="Roll Number" name ="rollNo" type="text" placeholder="Your Roll Number"/><br/>
                    <CustomTextInput label="Name" name ="name" type="text" placeholder="Your Name"/><br/>
                    <CustomTextInput label="Roll Number" name ="desc" type="text" placeholder="Your Description"/><br/>
                    <button className="btn btn-primary" type="submit">{props.isSubmitting?'Loading...': 'Submit'}</button>
                  </Form>
                )}
            </Formik>
          </div>
        )
    }
}

export default addStudents;