import { FETCH_ALL,CREATE,UPDATE,DELETE } from '../constants/actionTypes';
import * as api from '../api/api';

export const getTodos = ()=>async(dispatch)=>{
    try{
        const  { data }  =await api.getTodos();
        console.log(data);
        dispatch({type:FETCH_ALL,payload:data});
    }catch(err){
        console.log(err);
    }
}

export const createTodo = (todo) =>async(dispatch)=>{
    try{
        const {data} = await api.createTodo(todo);
        dispatch({type:CREATE,payload:data})
    }
    catch(err){
        console.log(err);
    }
}

export const updateTodo = (id,todo)=>async(dispatch)=>{
    try{
       const {data} = await api.updateTodo(id,todo);
       dispatch({type:UPDATE,payload:data});
    }
    catch(err){
        console.log(err);
    }
}

export const deleteTodo = (id)=>async(dispatch)=>{
    try{
        await api.deleteTodo(id);
        dispatch({type:DELETE,payload: id});
    }
    catch(err){
        console.log(err);
    }
}