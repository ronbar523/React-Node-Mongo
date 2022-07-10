import http from "./httpService";

const URL = process.env.REACT_APP_SERVER_URL;

//POST
export const createNewProduct = (product) =>
  http.post(`${URL}/products/create`, product);

//GET
export const getAllProducts = () => http.get(`${URL}/products/findAll`);

export const getProductById = (id, product) =>
  http.get(`${URL}/products/findById/${id}`, product);

export const getProductsByCategory = (category) =>
  http.get(`${URL}/products/findProduct`, {
    params: { category },
  });

export const getMyProducts = () => http.get(`${URL}/products/my/products`);

//DELETE
export const deleteProductById = (id) => http.delete(`${URL}/products/delete/${id}`); 

//PUT
export const updateProductById = (id, product) =>
  http.put(`${URL}/products/update/${id}`, product);

export const makeDealById = (id, product) =>
  http.put(`${URL}/products/deal/${id}`, product);

