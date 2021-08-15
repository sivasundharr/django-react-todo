import {CREATE,FETCH_ALL,DELETE,UPDATE} from '../constants/actionTypes';

export default (todos = [],action)=>{
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...todos,action.payload];
        case UPDATE:
            return todos.map((todo) => todo.id === action.payload.id ? action.payload : todo);
        case DELETE:
            return todos.filter((todo)=>todo.id !== action.payload);
        default:
            return todos;
    }
}