import api from './api';

export const getEmployees = async () => {
  return await api.get('/Employee/GetEmployees');
};

export const getEmployeeById = async (id) => {
  return await api.get(`/Employee/GetEmployeeById/${id}`);
};

export const createEmployee = async (employee) => {
  return await api.post('/Employee/AddEmployee', employee);
};

export const updateEmployee = async (employee) => {
  return await api.put('/Employee/UpdateEmployee', employee);
};

export const deleteEmployee = async (id) => {
  return await api.delete(`/Employee/DeleteEmployee/${id}`);
};