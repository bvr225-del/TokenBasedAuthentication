import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createEmployee, 
  getEmployeeById, 
  updateEmployee 
} from '../services/EmployeeService';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    empname: '',
    empsalary: ''
  });

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const { data } = await getEmployeeById(id);
          setFormData({
            empname: data.empname,
            empsalary: data.empsalary
          });
        } catch (error) {
          setErrors({ general: 'Failed to load employee' });
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.empname.trim()) {
      newErrors.empname = 'Employee name is required';
    } else if (formData.empname.trim().length < 4) {
      newErrors.empname = 'Employee name must be at least 4 characters';
    }

    if (formData.empsalary === '' || formData.empsalary === null) {
      newErrors.empsalary = 'Salary is required';
    } else {
      const salaryValue = Number(formData.empsalary);
      if (Number.isNaN(salaryValue) || salaryValue < 0) {
        newErrors.empsalary = 'Salary must be a valid non-negative number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (id) {
        await updateEmployee({ ...formData, empid: id, empsalary: Number(formData.empsalary) });
      } else {
        await createEmployee({ ...formData, empsalary: Number(formData.empsalary) });
      }
      navigate('/employees');
    } catch (error) {
      setErrors({ general: id ? 'Failed to update employee' : 'Failed to create employee' });
    }
  };

  return (
  <div className="mt-4 m-auto w-75">
    <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Employee Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.empname}
          onChange={(e) => {
            setFormData({ ...formData, empname: e.target.value });
            setErrors((prev) => ({ ...prev, empname: '' }));
          }}
        />
        {errors.empname && <span className="text-danger">{errors.empname}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Salary</label>
        <input
          type="text"
          className="form-control"
          min="0"
          step="100"
          value={formData.empsalary}
          onChange={(e) => {
            setFormData({ ...formData, empsalary: e.target.value });
            setErrors((prev) => ({ ...prev, empsalary: '' }));
          }}
        />
        {errors.empsalary && <span className="text-danger">{errors.empsalary}</span>}
      </div>

      {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

      <div className="d-flex gap-3">
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
}

export default EmployeeForm;