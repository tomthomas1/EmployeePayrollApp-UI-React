import React, { Component , useState } from "react";
import "./Home.css";

import { Link } from "react-router-dom";

import delete1 from "../assets/icons/delete.svg";
import edit1 from "../assets/icons/edit.svg";


import EmployeePayrollService from "../service/EmployeePayrollService";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };

 
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  deleteEmployee(employeeId){
    let id = parseInt(employeeId)
    console.log("employee id" + id);
    EmployeePayrollService.delete(id);
    this.fetchData();
    }

    fetchData(){
      EmployeePayrollService.getAllEmployee().then((res) => {
        this.setState({ employees: res.data });
      });
    }

  componentDidMount() {
   this.fetchData();
  }

  updateEmployee = (employeeId) => {
    console.log(employeeId)
    this.props.history.push(`payroll-form/${employeeId}`);
};

  render() {
    return (
      <div>
        <header className="header-content header">
        <div className="logo-content">
          <img src="/formImages/logo.PNG" alt="myLogo" />
          <div>
            <span className="emp-text">EMPLOYEE</span>
            <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>
        <div>
          <div className="main-content">
            <div className="header-content employee-header">
              <div className="emp-detail-text">
                Employee Details
                <div className="emp-count">{this.state.employees.length}</div>
              </div>
              <Link to="/payroll-form" className="add-button">
                <img src="../assets/plus_symbol.svg" alt="" />
                Add User
              </Link>
            </div>
            <div className="table-main">
              <table id="table-display" className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.employees.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>{employee.employeeId}</td>
                      <td><img src={employee.profilePic} alt="ProfilePic" srcset="" /></td>
                      <td>{employee.name}</td>
                      <td>{employee.gender}</td>
                      <td>
                        {employee.departments.map(dep => 
                          <div className="dept-label" id="dept"> {dep} </div>)}
                      </td>
                      <td>{employee.salary}</td>
                      <td>{employee.startDate}</td>
                      <td>
                        <img
                          name={employee.employeeId}
                          src={delete1}
                          alt="delete"
                          onClick={() =>
                            this.deleteEmployee(employee.employeeId)
                          }
                        />
                        <img
                          name={employee.employeeId}
                          src={edit1}
                          alt="edit"
                          onClick={() =>
                            this.updateEmployee(employee.employeeId)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;