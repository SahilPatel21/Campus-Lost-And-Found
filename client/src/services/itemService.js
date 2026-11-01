// services/itemService.js
import api from './api';

const getItems = async (params = {}) => {
  const { data } = await api.get('/items', { params });
  return data; // { success, count, data: items }
};

const getItemById = async (id) => {
  const { data } = await api.get(`/items/${id}`);
  return data.data;
};

const createItem = async (itemData) => {
  const { data } = await api.post('/items', itemData);
  return data;
};

const updateItem = async (id, itemData) => {
  const { data } = await api.put(`/items/${id}`, itemData);
  return data;
};

const deleteItem = async (id) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};

const getMyItems = async () => {
  const { data } = await api.get('/items/my-items');
  return data.data;
};

const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data; // { success, imageUrl, filename }
};

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
  uploadPhoto,
};
