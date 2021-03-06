import React from "react";
import "./Form.css";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import profilePic1 from "../assets/profile-images/Eclipse-1.PNG";
import profilePic2 from "../assets/profile-images/Eclipse-2.PNG";
import profilePic3 from "../assets/profile-images/Eclipse-3.PNG";
import profilePic4 from "../assets/profile-images/Eclipse-4.PNG";
import EmployeePayrollService from "../service/EmployeePayrollService";

export default function EmployeePayrollForm(props) {
  const [nameRegexError, setNameRegexError] = useState("");
  const allDepartment = ["HR", "Sales", "Finance", "Engineer", "Others"];
  // const []

  let [userRegistration, setUserRegistration] = useState({
    name: "",
    profile: "",
    gender: "",
    departments: [],
    salary: "",
    startDate: "",
    notes: "",
    empId: "",
    isUpdate: false,
  });

  const onCheckChange = (name) => {
    let index = userRegistration.departments.indexOf(name);

    let checkArray = [...userRegistration.departments];

    if (index > -1) checkArray.splice(index, 1);
    else checkArray.push(name);

    setUserRegistration({ ...userRegistration, departments: checkArray });
  };

  const getChecked = (name) => {
    return (
      userRegistration.departments &&
      userRegistration.departments.includes(name)
    );
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const value = props.location.state;
  useEffect(() => {
    if (value) {
      getDataById(value);
    }
  });

  const getDataById = (id) => {
    console.log("method is calling");
    EmployeePayrollService.getEmployeeById(id).then((response) => {
      console.log(response);
      setUserRegistration({
        ...userRegistration,
        ...response,
        name: response.data.data.name,
        profile: response.data.data.profile,
        gender: response.data.data.gender,
        departments: response.data.data.departments,
        salary: response.data.data.salary,
        startDate: response.data.data.startDate,
        notes: response.data.data.note,
        isUpdate: true,
      });
    });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    let employee = {
      employeeId: "",
      name: userRegistration.name,
      salary: userRegistration.salary,
      gender: userRegistration.gender,
      startDate: userRegistration.startDate,
      note: userRegistration.notes,
      profilePic: userRegistration.profile,
      departments: userRegistration.departments,
    };

    if (userRegistration.isUpdate) {
      EmployeePayrollService.updateEmployee(value, employee).then(
        (response) => {
          props.history.push({
            pathname: "/home",
          });
        }
      );
    } else {
      EmployeePayrollService.addEmployee(employee).then((response) => {
        console.log(response);
        props.history.push({
          pathname: "/home/",
        });
      });
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setUserRegistration({
      name: "",
      profile: "",
      gender: "",
      departments: [],
      salary: "",
      startDate: "",
      notes: "",
      empId: "",
    });
  };

  //name validation handler
  function nameValidationHandler(event) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z\\s]*$");
    if (nameRegex.test(event.target.value)) {
      setNameRegexError("");
    } else {
      setNameRegexError("Name is incorrect");
    }
  }

  return (
    <div>
      <header className="header-content header">
        <div className="logo-content">
          <img className="logo-content-img" src="/formImages/logo.PNG" alt="" />
          <div>
            <span className="emp-text">EMPLOYEE</span>
            <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>

      <div id="formId" className="form-content">
        <form
          className="form"
          action="#"
          onSubmit={(event) => {
            saveEmployee(event);
          }}
          onReset={(event) => {
            reset(event);
          }}
        >
          {/* uc2 */}
          <div className="form-head">Employee Payroll Form</div>
          {/* ****************************Name********************************************** */}
          <div className="row-content">
            <label className="label text" htmlFor="name">
              Name{" "}
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name.."
              required
              value={userRegistration.name}
              onChange={(event) => {
                nameValidationHandler(event);
                handleInput(event);
              }}
            />
            {nameRegexError}
            <error-output className="text-error" htmlFor="text" />
          </div>
          {/* *****************************Profile photo*************************************************** */}
          {/* uc3 */}
          <div className="row-content">
            <label className="label text" htmlFor="profile">
              Profile image
            </label>
            <div className="profile-radio-content">
              <label>
                <input
                  type="radio"
                  id="profile1"
                  name="profile"
                  defaultValue={profilePic1}
                  required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img
                  className="profile"
                  id="image1"
                  src={profilePic1}
                  alt="#"
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile2"
                  name="profile"
                  defaultValue={profilePic2}
                  required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img
                  className="profile"
                  id="image2"
                  src={profilePic2}
                  alt="#"
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile3"
                  name="profile"
                  defaultValue={profilePic3}
                  required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img
                  className="profile"
                  id="image3"
                  src={profilePic3}
                  alt="#"
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile4"
                  name="profile"
                  defaultValue={profilePic4}
                  required
                  onChange={(event) => {
                    handleInput(event);
                  }}
                />
                <img
                  className="profile"
                  id="image4"
                  src={profilePic4}
                  alt="#"
                />
              </label>
            </div>
          </div>
          {/* *********************************Gender********************************************* */}
          {/* uc4 */}
          <div className="row-content">
            <label className="label text" htmlFor="gender">
              Gender
            </label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                defaultValue="male"
                checked={userRegistration.gender === "male"}
                onChange={(event) => {
                  handleInput(event);
                }}
              />
              <label className="text" htmlFor="male">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                defaultValue="female"
                checked={userRegistration.gender === "female"}
                onChange={(event) => {
                  handleInput(event);
                }}
              />
              <label className="text" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          {/* ********************************Department************************************************* */}
          <div className="row-content">
            <label className="label-text-dep" htmlFor="department">
              Department
            </label>
            <div className="label-dep">
              {allDepartment.map((item) => (
                <span key={item}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => onCheckChange(item)}
                    name={item}
                    checked={getChecked(item)}
                    value={item}
                  />
                  <label className="text" htmlFor={item}>
                    {item}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <br></br>
          {/* *********************************Salary************************************************ */}
          <div className="row-content">
            <label className="label text" htmlFor="salary">
              Choose your salary:{" "}
            </label>
            <input
              className="input"
              id="salary"
              type="range"
              name="salary"
              min={300000}
              max={500000}
              step={100}
              defaultValue={userRegistration.salary}
              onChange={(event) => {
                handleInput(event);
              }}
            />
            <output className="salary-output text" htmlFor="salary">
              {userRegistration.salary ? userRegistration.salary : 400000}
            </output>
          </div>
          {/* ************************************Date***************************** */}
          <div className="row-content">
            <label className="text label" htmlFor="startDate">
              Start Date
            </label>

            <input
              id="startDate"
              type="date"
              className="input"
              value={userRegistration.startDate}
              name="startDate"
              onChange={(event) => {
                handleInput(event);
              }}
            />
          </div>
          {/* **********************************Notes******************************************* */}
          {/* UC-6 */}
          <div className="row-content">
            <label className="label text" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              className="input"
              name="notes"
              placeholder="Add notes...."
              style={{ height: "100px" }}
              defaultValue={userRegistration.notes}
              onChange={(event) => {
                handleInput(event);
              }}
            />
          </div>
          {/* **************************************Buttons****************************************** */}
          <div className="buttonParent">
            <Link to="/home" className="resetButton button cancelButton">
              Cancel
            </Link>

            <div className="submit-reset">
              <button
                type="submit"
                className="button submitButton"
                id="submitButton"
              >
                {userRegistration.isUpdate ? "Update" : "Submit"}
              </button>
              <button
                type="reset"
                className="button resetButton"
                id="resetButton"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
