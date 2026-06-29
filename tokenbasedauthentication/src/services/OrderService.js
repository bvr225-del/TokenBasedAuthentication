import api from './api';

export const getOrders = async () => {
  return await api.get('/Orders/GetOrders');
};

export const getOrderById = async (id) => {
  return await api.get(`/Orders/GetOrderByid/${id}`);
};

export const createOrder = async (order) => {
  return await api.post('/Orders/AddOrder', order);
};

export const updateOrder = async (order) => {
  return await api.put('/Orders/UpdateOrder', order);
};

export const deleteOrder = async (id) => {
  return await api.delete(`/Orders/DeleteOrdersById/${id}`);
};