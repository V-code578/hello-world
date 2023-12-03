import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({ empId: 0, empName: "", age: 0, salary: 0 });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchData();
    }, [saved]);

    const fetchData = () => {
        fetch("http://localhost:5106/api/Employee", {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(result => {
                setEmployees(result);
            });
    }

    const saveEmployee = (event) => {
        event.preventDefault();
        fetch("http://localhost:5106/api/Employee", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(result => result.json())
            .then(result => {
                alert("New employee added");
                setSaved(true);
            });
    }

    const updateEmployee = () => {
        fetch(`http://localhost:5106/api/Employee/${employee.empId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(result => result.json())
            .then(result => {
                alert("Employee details updated");
                setSaved(true);
            });
    }

    const deleteEmployee = () => {
        fetch(`http://localhost:5106/api/Employee/${employee.empId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(result => result.text())
            .then(result => {
                alert("Employee deleted");
                setSaved(true);
            });
    }

    return (
        <div>
            <h3>Employee Form</h3>
            <form onSubmit={saveEmployee}>
                Emp Id: <input type="number" value={employee.empId} onChange={(e) => setEmployee(prevState => ({ ...prevState, empId: e.target.value }))} /><br />
                Emp Name: <input type="text" value={employee.empName} onChange={(e) => setEmployee(prevState => ({ ...prevState, empName: e.target.value }))} /><br />
                Age: <input type="number" value={employee.age} onChange={(e) => setEmployee(prevState => ({ ...prevState, age: e.target.value }))} /><br />
                Salary: <input type="number" value={employee.salary} onChange={(e) => setEmployee(prevState => ({ ...prevState, salary: e.target.value }))} /><br />
                <input type="submit" value="Save" />
                <input type="button" value="Update" onClick={updateEmployee} />
                <input type="button" value="Delete" onClick={deleteEmployee} />
            </form>
            <h3>List of Employees</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Emp Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.empId}>
                            <td>{emp.empId}</td>
                            <td>{emp.empName}</td>
                            <td>{emp.age}</td>
                            <td>{emp.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
