import api from './api';

export const getDepartments = async () => {
  return await api.get('/Department/GetDepartments');
};

export const getDepartmentById = async (id) => {
  return await api.get(`/Department/GetDepartmentById/${id}`);
};

export const createDepartment = async (department) => {
  return await api.post('/Department/AddDepartment', department);
};

export const updateDepartment = async (department) => {
  return await api.put('/Department/UpdateDepartment', department);
};

export const deleteDepartment = async (id) => {
  return await api.delete(`/Department/DeleteDepartment/${id}`);
};