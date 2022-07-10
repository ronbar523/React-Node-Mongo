import http from "./httpService";

const URL = process.env.REACT_APP_SERVER_URL;

//POST
export const createNewCategory = (category) =>
http.post(`${URL}/categories/create`, category);

//GET
export const getAllCategory = () => http.get(`${URL}/categories/findAll`);

export const getCategoryById = (id, category) =>
  http.get(`${URL}/categories/findById/${id}`, category);

//DELETE
export const deleteCategoryById = (id) => http.delete(`${URL}/categories/delete/${id}`); 

//PUT
export const updateCategoryById = (id, category) =>
  http.put(`${URL}/categories/update/${id}`, category);

