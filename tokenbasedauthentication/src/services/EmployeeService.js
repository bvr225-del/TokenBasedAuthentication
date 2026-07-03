import TokenApi from './TokenApi';

export const getEmployees = async () => {
  return await TokenApi.get('/Employee/GetEmployees');
};

export const getEmployeeById = async (id) => {
  return await TokenApi.get(`/Employee/GetEmployeeById/${id}`);
};

export const createEmployee = async (employee) => {
  return await TokenApi.post('/Employee/AddEmployee', employee);
};

export const updateEmployee = async (employee) => {
  return await TokenApi.put('/Employee/UpdateEmployee', employee);
};

export const deleteEmployee = async (id) => {
  return await TokenApi.delete(`/Employee/DeleteEmployee/${id}`);
};