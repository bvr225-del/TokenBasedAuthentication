import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (error) {
      setError('Failed to fetch employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      setError('Failed to delete employee');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => navigate('/employees/add')}
      >
        Add Employee
      </button>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empid}>
              <td>{emp.empid}</td>
              <td>{emp.empname}</td>
              <td>
                <span className="badge bg-success">
                  ${emp.empsalary.toLocaleString()}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/employees/edit/${emp.empid}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(emp.empid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;