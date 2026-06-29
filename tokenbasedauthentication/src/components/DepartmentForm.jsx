import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createDepartment,
  getDepartmentById,
  updateDepartment
} from '../services/DepartmentService';

function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    deptname: '',
    deptlocation: ''
  });

  useEffect(() => {
    if (id) {
      const fetchDepartment = async () => {
        try {
          const { data } = await getDepartmentById(id);
          setFormData({
            deptname: data.deptname,
            deptlocation: data.deptlocation
          });
        } catch (error) {
          setError('Failed to load department');
        }
      };
      fetchDepartment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDepartment({ ...formData, deptid: id });
      } else {
        await createDepartment(formData);
      }
      navigate('/departments');
    } catch (error) {
      setError(id ? 'Failed to update department' : 'Failed to create department');
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <h2>{id ? 'Edit Department' : 'Create Department'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Department Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.deptname}
            onChange={(e) => setFormData({ ...formData, deptname: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.deptlocation}
            onChange={(e) => setFormData({ ...formData, deptlocation: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Create'}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate('/departments')}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default DepartmentForm;