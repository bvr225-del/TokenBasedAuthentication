import api from './api';

export const getRestaurants = async () => {
  return await api.get('/Restaurant/GetRestaurants');
};

export const getRestaurantById = async (id) => {
  return await api.get(`/Restaurant/GetRestaurantById/${id}`);
};

export const createRestaurant = async (restaurant) => {
  return await api.post('/Restaurant/AddRestaurant', restaurant);
};

export const updateRestaurant = async (restaurant) => {
  return await api.put('/Restaurant/UpdateRestaurant', restaurant);
};

export const deleteRestaurant = async (id) => {
  return await api.delete(`/Restaurant/DeleteRestaurant/${id}`);
};