import axios from 'axios';

const API = axios.create({
    baseURL:'http://127.0.0.1:8000/api'
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem("profile")).key}`;
    }
    return req;
});

export const getTodos = () => API.get("/todo/");

export const createTodo = (newTodo) =>API.post("/todo/",newTodo);

export const updateTodo = (id,data)=>API.patch(`/todo/${id}/`,data);

export const deleteTodo = (id)=> API.delete(`/todo/${id}/`);

export const signin = (formData) =>API.post('/v1/rest-auth/login/',formData);

export const signup = (formData) =>API.post('/v1/rest-auth/registration/',formData);