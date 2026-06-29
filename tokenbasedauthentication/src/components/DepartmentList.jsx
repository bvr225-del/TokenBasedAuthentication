import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  getDepartments, 
  deleteDepartment 
} from '../services/DepartmentService';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await getDepartments();
      setDepartments(data);
    } catch (error) {
      setError('Failed to fetch departments');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      setError('Failed to delete department');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => navigate('/departments/add')}
      >
        Add Department
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.deptid}>
              <td>{dept.deptid}</td>
              <td>{dept.deptname}</td>
              <td>{dept.deptlocation}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => navigate(`/departments/edit/${dept.deptid}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="ms-2"
                  onClick={() => handleDelete(dept.deptid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DepartmentList;