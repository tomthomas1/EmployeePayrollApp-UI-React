import axios from "axios";

const baseURL="http://localhost:8081/employee";

class EmployeePayrollService {


  addEmployee = (employee) => {
    console.log(employee)
    return axios.post(baseURL + '/create',employee);
}

delete = (employeeId) => {
  //return axios.delete(this.baseURL + '/delete',data)
  axios.delete(`${baseURL}/delete/${employeeId}`);
}

getAllEmployee(){
  return axios.get(baseURL + "/list");
}

getEmployeeById = (employeeId) => {
  return axios.get(baseURL+`/get/${employeeId}`)
}

updateEmployee= (empId,data) => {
  console.log(empId);
  return axios.put(baseURL+`/update/${empId}`,data);
}

}

export default new EmployeePayrollService();
