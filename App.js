import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './StudentList.jsx';

const studentList = [{id:1,name:'John Doe',grade:1,school:'React Redux School'},{id:2,name:'Jane Doe',grade:2,school:'React Redux School'}
,{id:3,name:'Terry Adams',grade:3,school:'React Redux School'},{id:4,name:'Jenny Smith',grade:4,school:'React Redux School'}];

if (localStorage.getItem("students") === null)
  localStorage.setItem('students', JSON.stringify(studentList));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    }
    this.editStudentSubmit = this.editStudentSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
  }
  componentWillMount() {
    let studentList = JSON.parse(localStorage.getItem("students"));

    this.setState((prevState, props) => (
      {
        studentList: studentList
      }
    )
    );
  }
  addNewStudent() {
    this.setState((prevState, props) => ({

      studentList: [...prevState.studentList, { id:Math.max(...prevState.studentList.map(function(o){return o.id})) + 1,name: '', grade: 1, school: '' }]

    }));
  }

  deleteStudent(id) {
    let r = window.confirm("Do you want to delete this item");
    if (r === true) {
      let filteredStudentList = this.state.studentList.filter(x => x.id !== id);

      this.setState((prevState, props) => ({
        studentList: filteredStudentList
      }));
      localStorage.setItem('students', JSON.stringify(filteredStudentList));
    }
  }
  editStudentSubmit(id,name, grade, school) {
    let studentListCopy = this.state.studentList.map((student) => {
      if (student.id === id) {
        student.name = name;
        student.grade = grade;
        student.school = school;
      }
      return student;
    });
    this.setState((prevState, props) => ({
      studentList: studentListCopy
    }));
    localStorage.setItem('students', JSON.stringify(studentListCopy));
  }
  render() {
    return (

      <div className="container-fluid">
        <div className="row mt-3"><div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              Student Registry
  </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-dark"><tr><th>Name</th><th>Grade</th><th>School</th><th>Edit/Save</th><th>Delete</th></tr></thead>
                <StudentList deleteStudent={this.deleteStudent} studentList={this.state.studentList} editStudentSubmit={this.editStudentSubmit} />
              </table>
              <button className="btn btn-dark pull-left" onClick={this.addNewStudent}>Add New</button>
            </div></div></div></div></div>
    );
  }
}

export default App;
